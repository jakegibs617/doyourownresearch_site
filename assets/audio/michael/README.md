# Michael report narration

The MP3 files in this directory are pre-generated narrations of the public
report text. They use Kokoro's `am_michael` American English male voice at a
`1.15` speed, with 20 ms between synthesized sentences and 120 ms between page
segments.

The matching `*.cues.json` files map exact audio times to stable
`data-speech-id` values in the report renderer. Their text fingerprint is
validated by `npm test`, so changing report narration without regenerating its
audio fails the publication checks.

- Voice model: <https://huggingface.co/hexgrad/Kokoro-82M>
- Kokoro runtime: <https://github.com/hexgrad/kokoro>
- Voice description: single-speaker US English male voice from the Kokoro-82M
  release, published under Apache 2.0 along with the model weights

Kokoro, PyTorch and the model weights are build tools and are not shipped to
site visitors. Browsers receive only the compressed narration and cue data.
Encoding uses `lame` rather than ffmpeg, which needs no video codecs.
