//LIMITATIONS: Only HSL (no rgb)
//preserve drawingbuffer must be on! (static painting at end)

var camera, renderer, scene, controls, clock, perlin, wineglass;

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
  var color = new THREE.Color().setHSL(335/360, .89, .62)
  var sphereMat = new THREE.MeshBasicMaterial({color:color})
  sphere = new THREE.Mesh(new THREE.SphereGeometry(.1), sphereMat);
  sphere.position.x = -5
  wineglass = new WineGlass();
  scene.add(sphere);




}


function animate() {
  stroke();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}


//start stoking from the bottom of the glass
//work way upwards to top. 
//pick random angle to stroke at.
//at every point, check to make sure we're not out of bounds (x = sqrt(y))
function stroke(){
  //

}

function map(value, min1, max1, min2, max2) {
  return min2 + (max2 - min2) * ((value - min1) / (max1 - min1));
};

function onWindowResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}


function loadAudio(uri) {
  var audio = new Audio();
  audio.src = uri;
  return audio;
}