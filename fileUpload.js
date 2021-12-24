const rootStyles = window.getComputerStyle(document.documentElement);

if (
  rootStyles.getPropertyValue("--book-cover-width-large") != null &&
  rootStyles.getPropertyValue("--book-cover-width-large") !== ""
) {
  ready();
} else {
  // checking to see if the main css is working
  document.getElementById("main-css").addEventListener("load", ready);
}

function ready() {
  const coverWidth = parsefloat(
    rootStyles.getPropertyValue("--book-cover-width-large")
  );
  const coverAspectRatio = parsefloat(
    rootStyles.getPropertyValue("--book-cover-aspect-ratio")
  );
  const coverHeight = coverWidth / coverAspectRatio;
  FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
    FilePondPluginFileEncode
  );

  FilePond.setOptions({
    stylePanelAspectRatio: 1 / coverAspectRatio,
    imageResizeTargetWidth: coverWidth,
    imageResizeTargetHeight: coverHeight,
  });

  FilePond.parse(document.body);
}
