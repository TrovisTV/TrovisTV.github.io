import QrScanner from "https://cdnjs.cloudflare.com/ajax/libs/qr-scanner/1.4.2/qr-scanner.min.js";

const video = document.getElementById("qr-video");
const camQrResult = document.getElementById('cam-qr-result');
const playButton = document.getElementById("play");

function debounce_leading(func, timeout = 300){
  let timer;
  return (...args) => {
    if (!timer) {
      func.apply(this, args);
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = undefined;
    }, timeout);
  };
}

function setResultFunc(label, result) {
  label.textContent = result.data;
  label.style.color = 'teal';
  // window.open(result.data, "_self");
  playButton.dataset.spotifyId = result.data;
  playButton.click();
  clearTimeout(label.highlightTimeout);
  label.highlightTimeout = setTimeout(() => {
    label.style.color = 'inherit';
  }, 1000);
}

const setResult = debounce_leading((label, result) => setResultFunc(label, result), 2000);

const qrScanner = new QrScanner(
  video,
  result => setResult(camQrResult, result),
  {
    onDecodeError: error => {
      camQrResult.textContent = error;
      camQrResult.style.color = "inherit";
    },
    highlightScanRegion: true,
    highlightCodeOutline: true,
  },
);

qrScanner.start();

document.getElementById('start-button').addEventListener('click', () => {
  qrScanner.start();
});

document.getElementById('stop-button').addEventListener('click', () => {
  qrScanner.stop();
});

// spotify
window.onSpotifyIframeApiReady = (IFrameAPI) => {
  const element = document.getElementById('embed-iframe');
  const options = {
      uri: '',
    };
  const callback = (EmbedController) => {
    playButton.addEventListener('click', () => {
      EmbedController.loadUri(playButton.dataset.spotifyId);
      EmbedController.play();
    });
  };
  IFrameAPI.createController(element, options, callback);
};
