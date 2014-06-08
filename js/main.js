//LIMITATIONS: Only HSL (no rgb)
//preserve drawingbuffer must be on! (static painting at end)

var camera, renderer, scene, controls, clock, perlin, wineglass, brushtray, landscape, sky;

var line;
var randFloat = THREE.Math.randFloat;

var sphere;
var skyHeight = 10
var baseLayerTime = 2000;

window.addEventListener('resize', onWindowResize);

var w = window.innerWidth;
var h = window.innerHeight;
var leftScreen = -w/16;
var rightScreen = w/16;
console.log(window.innerWidth)
var topScreen = 50;
var bottomScreen = -50;


// music.play();

// var audio = loadAudio('audio/lights.mp3');
// audio.play();
init();
animate();


function init() {
  clock = new THREE.Clock();

  perlin = new ImprovedNoise();

  camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 2000);
  camera.position.z = 120;


  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer({preserveDrawingBuffer: true});
  // renderer = new THREE.WebGLRenderer({preserveDrawingBuffer: false});
  renderer.autoClearColor = false;
  renderer.setSize(w, h);
  document.body.appendChild(renderer.domElement);

  brushFactory = new BrushFactory();

  //To avoid jerkiness
  setTimeout(function(){
    landscape = new Landscape();
    sky = new Sky();
    grapes = new Grapes();
  }, 500);

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