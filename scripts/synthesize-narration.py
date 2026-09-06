#!/usr/bin/env python3
"""Render a report narration manifest with Kokoro and encode it for the web."""

from __future__ import annotations

import argparse
import json
import subprocess
import tempfile
import wave
from pathlib import Path

import numpy as np
from kokoro import KPipeline

SAMPLE_RATE = 24000
REPO_ID = "hexgrad/Kokoro-82M"


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("--manifest", required=True, type=Path)
    parser.add_argument("--voice", default="am_michael")
    parser.add_argument("--lang-code", default="a", help="Kokoro language code; 'a' is American English")
    parser.add_argument("--audio", required=True, type=Path)
    parser.add_argument("--cues", required=True, type=Path)
    parser.add_argument("--lame", default="lame")
    parser.add_argument("--speed", type=float, default=1.0)
    parser.add_argument("--sentence-silence", type=float, default=0.02)
    parser.add_argument("--segment-silence", type=float, default=0.12)
    parser.add_argument("--bitrate", default="64k")
    return parser.parse_args()


def write_silence(wav_file: wave.Wave_write, frames: int, sample_width: int, channels: int) -> None:
    if frames > 0:
        wav_file.writeframes(bytes(frames * sample_width * channels))


def to_int16_bytes(audio) -> bytes:
    samples = np.asarray(audio, dtype=np.float32)
    return (np.clip(samples, -1.0, 1.0) * 32767.0).astype("<i2").tobytes()


def main() -> None:
    args = parse_args()
    payload = json.loads(args.manifest.read_text(encoding="utf-8"))
    segments = payload.get("segments", [])
    if not segments:
        raise SystemExit("Narration manifest contains no segments")

    args.audio.parent.mkdir(parents=True, exist_ok=True)
    args.cues.parent.mkdir(parents=True, exist_ok=True)

    pipeline = KPipeline(lang_code=args.lang_code, repo_id=REPO_ID)
    sample_width = 2
    channels = 1
    sentence_silence_frames = round(SAMPLE_RATE * args.sentence_silence)
    segment_silence_frames = round(SAMPLE_RATE * args.segment_silence)
    cues: list[dict[str, object]] = []
    frames_written = 0

    with tempfile.TemporaryDirectory(prefix="dyor-michael-") as temporary_directory:
        wav_path = Path(temporary_directory) / "narration.wav"
        with wave.open(str(wav_path), "wb") as wav_file:
            wav_file.setframerate(SAMPLE_RATE)
            wav_file.setsampwidth(sample_width)
            wav_file.setnchannels(channels)

            for segment in segments:
                start = frames_written / SAMPLE_RATE
                spoken = 0
                for result in pipeline(segment["text"], voice=args.voice, speed=args.speed):
                    if result.audio is None:
                        continue
                    if spoken > 0:
                        write_silence(wav_file, sentence_silence_frames, sample_width, channels)
                        frames_written += sentence_silence_frames
                    chunk = to_int16_bytes(result.audio)
                    wav_file.writeframes(chunk)
                    frames_written += len(chunk) // (sample_width * channels)
                    spoken += 1

                if spoken == 0:
                    raise SystemExit(f"Kokoro produced no audio for segment {segment['id']}")

                end = frames_written / SAMPLE_RATE
                cues.append({
                    "id": segment["id"],
                    "start": round(start, 3),
                    "end": round(end, 3)
                })
                write_silence(wav_file, segment_silence_frames, sample_width, channels)
                frames_written += segment_silence_frames

        subprocess.run(
            [
                args.lame,
                "--quiet",
                "-m",
                "m",
                "-b",
                args.bitrate.removesuffix("k"),
                str(wav_path),
                str(args.audio),
            ],
            check=True,
        )

    cue_payload = {
        "schemaVersion": 1,
        "report": payload["report"],
        "voice": payload.get("voice", "Michael"),
        "voiceModel": payload.get("voiceModel", "kokoro-am_michael"),
        "language": payload.get("language", "en-US"),
        "speed": args.speed,
        "duration": round(frames_written / SAMPLE_RATE, 3),
        "fingerprint": payload["fingerprint"],
        "cues": cues,
    }
    args.cues.write_text(f"{json.dumps(cue_payload, indent=2)}\n", encoding="utf-8")
    print(
        f"Rendered {len(cues)} cues, {cue_payload['duration']:.1f}s, "
        f"{args.audio.stat().st_size / 1_000_000:.1f} MB"
    )


if __name__ == "__main__":
    main()
