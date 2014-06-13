// THREE.Colorb: 0.730438933474943g: 0.19595457217656076r: 0.2672971347346902

var Flower = function(){
  var texture;
  var emitters = [];
  var prevEmitter;
  var originalEmitters = []
  if(Math.random() > 0.5){
    texture = THREE.ImageUtils.loadTexture('assets/star.png');
  }
  else{
    texture = THREE.ImageUtils.loadTexture('assets/point.png');
  }
  var numEmitters = 100;
  var currentEmitterIndex =0;
	var particleGroup = new SPE.Group({
		texture: texture,
		maxAge: 5,
    blending: THREE.NormalBlending
	});

  for(var i  = 0; i < numEmitters; i++){
    var emitter = new SPE.Emitter(createFlower());
    emitter.disable();
    particleGroup.addEmitter(emitter);
    emitters.push(emitter);
    originalEmitters.push(emitter);
  }
  changeFlowers();
  function changeFlowers(){
    prevEmitter && prevEmitter.disable();
    var emitter = _.sample(emitters);
    emitter.enable();
    emitters.splice(emitters.indexOf(emitter), 1);
    prevEmitter = emitter;

    setTimeout(function(){
      if(emitters.length ===0){
        //recopy emitters from original emitters
        _.each(originalEmitters, function(originalEmitter){
          emitters.push(originalEmitter)
        });
      }
      changeFlowers();
    }, _.random(5000, 10000));
  }
    

  function createFlower(){
    var range = 4;
    var colorStart = new THREE.Color().setHSL(Math.random(), randFloat(0.5, 1.0), randFloat(0.4, 0.9) );
    var colorMiddle = new THREE.Color().setHSL(Math.random(), randFloat(0.5, 1.0), randFloat(0.4, 0.9));
    var colorEnd = new THREE.Color().setHSL(Math.random() , randFloat(0.5, 1.0), randFloat(0.4, 0.9) );
    var spreadBase = randFloat(5, 10);
    var velBase = randFloat(0, 4);
    return{
      positionSpread: new THREE.Vector3(spreadBase, spreadBase, 0),
      sizeStart: randFloat(1, 5),
      sizeEnd:randFloat(4, 6),
      velocity: new THREE.Vector3(0, 0, -2),
      acceleration: new THREE.Vector3(0, 0, 2),
      velocitySpread: new THREE.Vector3(range,range, 0),
      accelerationSpread: new THREE.Vector3(range * .7,range * .7, 0),
      colorStart: colorStart,
      colorMiddle: colorEnd,
      colorEnd: colorEnd,
      particleCount: _.random(10, 100),
      opacityEnd: randFloat(0, 0.5)
    }
  }

	scene.add(particleGroup.mesh);

	this.update = function(){
		particleGroup.tick();
	}

}