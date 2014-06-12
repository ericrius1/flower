// THREE.Colorb: 0.730438933474943g: 0.19595457217656076r: 0.2672971347346902

var Flower = function(){
  var texture;
  var emitters = [];
  var originalEmitters = []''
  if(Math.random() > 0.5){
    texture = THREE.ImageUtils.loadTexture('assets/star.png');
  }
  else{
    texture = THREE.ImageUtils.loadTexture('assets/point.png');
  }
  var numEmitters = 20;
  var currentEmitterIndex =0;
	var particleGroup = new SPE.Group({
		texture: texture,
		maxAge: 4,
    blending: THREE.NormalBlending
	});

  for(var i  = 0; i < numEmitters; i++){
    var emitter = new SPE.Emitter(createFlower());
    emitter.disable();
    particleGroup.addEmitter(emitter);
    emitters.push(emitter);
  }
  changeFlowers();
  function changeFlowers(){
    for(var i  =0; i < emitters.length; i++){
      if(i === currentEmitterIndex){
        emitters[i].enable();
        console.log('enable')
      }
      else{
        emitters[i].disable()
      }
      
    }
    setTimeout(function(){
      currentEmitterIndex++;
      if(currentEmitterIndex === emitters.length){
        currentEmitterIndex = 0;
      }
      changeFlowers();
    }, _.random(5000, 10000));
  }
    

  function createFlower(){
    var range = 3;
    var colorStart = new THREE.Color().setHSL(Math.random(), randFloat(0.5, 1.0), randFloat(0.4, 0.9) );
    var colorMiddle = new THREE.Color().setHSL(Math.random(), randFloat(0.5, 1.0), randFloat(0.4, 0.9));
    var colorEnd = new THREE.Color().setHSL(Math.random() , randFloat(0.5, 1.0), randFloat(0.4, 0.9) );
    return{
      positionSpread: new THREE.Vector3(randFloat(0, 10), randFloat(0, 10), 0),
      sizeStart: randFloat(1, 10),
      sizeEnd:randFloat(1, 10),
      acceleration: new THREE.Vector3(0, 0, range),
      velocitySpread: new THREE.Vector3(randFloat(0, range), randFloat(0, range), 0),
      accelerationSpread: new THREE.Vector3(randFloat(0,range), randFloat(0, range), randFloat(0, 1)),
      colorStart: colorStart,
      colorMiddle: colorEnd,
      colorEnd: colorEnd,
      particleCount: _.random(10, 1000),
      opacityEnd: randFloat(0, 0.5)
    }
  }

	scene.add(particleGroup.mesh);

	this.update = function(){
		particleGroup.tick();
	}

}