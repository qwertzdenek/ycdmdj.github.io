// Page-wide audio context.
var audioContext = null;

$(document).ready(function () {
  try {
    // Fix up prefixing
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    audioContext = new AudioContext();
  }
  catch(e) {
    alert("Web Audio API is not supported in this browser");
  }
  
  audioPlayer.init();
});
