// THREE.Colorb: 0.730438933474943g: 0.19595457217656076r: 0.2672971347346902

var Bell = function(){
	var particleGroup = new SPE.Group({
		texture: THREE.ImageUtils.loadTexture('assets/point.png'),
		maxAge: 10,
    blending: THREE.NormalBlending
	});

  var params = {
    sizeStart: 10,
    velocitySpread: new THREE.Vector3(20, 20, 0),
    accelerationSpread: new THREE.Vector3(5,5,0),
    opacityEnd: 1,
    angleStartSpread: Math.PI * 2,
    particleCount: 10000
  }

  var colorStart = new THREE.Color().setHSL(Math.random(), 1.0, 0.5   );
  var colorEnd = new THREE.Color().setHSL(Math.random(), 1.0, 0.5   );
  var emitter = new SPE.Emitter(params);
  emitter = new SPE.Emitter(params);
  emitter.colorStart = colorStart
  emitter.colorMiddle = colorEnd
  emitter.colorEnd = colorEnd
  emitter.position.x = -40
  particleGroup.addEmitter(emitter);
  emitter.position.set(randFloat(leftScreen, rightScreen), randFloat(bottomScreen, topScreen), randFloat(-200, 0));
  
  //secodn emitter
  var emitter = new SPE.Emitter(params);
  colorStart = new THREE.Color().setHSL(Math.random(), 1.0, 0.5   );
  colorEnd = new THREE.Color().setHSL(Math.random(), 1.0, 0.5   );
  emitter.colorStart = colorStart
  emitter.colorMiddle = colorEnd
  emitter.colorEnd = colorEnd
  emitter.position.x = 40
	particleGroup.addEmitter(emitter);
  emitter.position.set(randFloat(leftScreen, rightScreen), randFloat(bottomScreen, topScreen), randFloat(-200, 0));




	scene.add(particleGroup.mesh);

	this.update = function(){
		particleGroup.tick();
	}

}