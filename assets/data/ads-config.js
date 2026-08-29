/*
 * Google AdSense configuration — the only file to edit when ad state changes.
 *
 * client   the AdSense publisher ID. Also hard-coded in each page <head> as the
 *          verification/loader snippet Google's crawler looks for.
 * enabled  master switch for the in-page ad slots. Keep false until real ad
 *          unit IDs exist below; set false to pull all ads off the site.
 * slots    ad unit IDs, created in the AdSense UI after the site is approved.
 *          A slot with an empty ID is removed from the page entirely.
 */
window.DYOR_ADS = {
  client: "ca-pub-5744142489358762",
  enabled: false,
  label: "Advertisement",
  slots: {
    homeArchive: "",
    reportEnd: ""
  }
};
