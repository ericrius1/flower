//LIMITATIONS: Only HSL (no rgb)
//preserve drawingbuffer must be on! (static painting at end)

//FIGURE OUT SCREENSPACE TO WORLD SPACE!!

var camera, renderer, projector, scene, controls, clock, bell;


var randFloat = THREE.Math.randFloat;

window.addEventListener('resize', onWindowResize);
window.addEventListener('mousedown', onMouseDown)

var w = window.innerWidth;
var h = window.innerHeight;
var leftScreen = -w/16;
var rightScreen = w/16;
console.log(window.innerWidth)
var topScreen = 50;
var bottomScreen = -50;
var pause = false;


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
  projector = new THREE.Projector();

  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer({preserveDrawingBuffer: true});
  // renderer = new THREE.WebGLRenderer({preserveDrawingBuffer: false});
  renderer.autoClearColor = false;
  renderer.setSize(w, h);
  document.body.appendChild(renderer.domElement);

  bell = new Bell();
}


function animate() {
  if(!pause){
    renderer.render(scene, camera);
    bell.update();
  }
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

function onMouseDown(){
  pause = !pause;
}

function randColor(){
  return new THREE.Color().setRGB(Math.random(), Math.random(), Math.random());
}
