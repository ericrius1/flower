//LIMITATIONS: Only HSL (no rgb)
//preserve drawingbuffer must be on! (static painting at end)

var camera, renderer, scene, controls, clock, perlin, wineglass, brushtray;

var line;
var randFloat = THREE.Math.randFloat;

var sphere;

window.addEventListener('resize', onWindowResize);

var leftScreen = -45;
var rightScreen = 45;
var topScreen = 50;
var bottomScreen = -50;


// music.play();

// var audio = loadAudio('audio/lights.mp3');
// audio.play();
init();
animate();


function init() {
  clock = new THREE.Clock();
  var w = window.innerWidth;
  var h = window.innerHeight;

  perlin = new ImprovedNoise();

  camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 2000);
  camera.position.z = 120;


  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer({preserveDrawingBuffer: true});
  renderer.autoClearColor = false;
  renderer.setSize(w, h);
  renderer.setClearColor(0x1b032c)
  document.body.appendChild(renderer.domElement);

  brushTray = new BrushTray();

  wineglass = new WineGlass();
  wineglass.paintGlass();
  wineglass.paintWine();
}


function animate() {
  TWEEN.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}


function map(value, min1, max1, min2, max2) {
  return min2 + (max2 - min2) * ((value - min1) / (max1 - min1));
};

function onWindowResize() {
  // renderer.setSize(window.innerWidth, window.innerHeight);
  // camera.aspect = window.innerWidth / window.innerHeight;
  // camera.updateProjectionMatrix();
}


function loadAudio(uri) {
  var audio = new Audio();
  audio.src = uri;
  return audio;
}