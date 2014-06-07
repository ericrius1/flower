var camera, renderer, scene, controls, clock, perlin;

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
  createWineGlass();
  scene.add(sphere);




}

//y = x^2
//start stoking from the bottom of the glass
//work way upwards to top. 
//pick random angle to stroke at.
//at every point, check to make sure we're not out of bounds (x = sqrt(y))
function animate() {
  stroke();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

function createWineGlass(){
  var p,y;
  var glassGeo = new THREE.Geometry();
  var func = function(x){
    return Math.pow(x,2)/20 - 40;
  }
  for(var x = -25; x < 25; x+=.1){
    y = func(x);
    p = new THREE.Vector3(x, y, 0);
    glassGeo.vertices.push(p);
  }
  var wineMat = new THREE.LineBasicMaterial({color: new THREE.Color(0xff00ff), linewidth: 5})
  var wineGlass = new THREE.Line(glassGeo, wineMat);
  scene.add(wineGlass);
}

function stroke(){

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