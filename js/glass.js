var Glass = function(){
	var baseGeo =new THREE.CircleGeometry(10, 20);
	var baseMat = new THREE.MeshBasicMaterial({color: 0xff0000,side: THREE.DoubleSide});
	var base= new THREE.Mesh(baseGeo, baseMat);
	base.position.y -=35;
	// scene.add(base);

	var stemGeo = new THREE.CylinderGeometry(1,1,5);
	var stem = new THREE.Mesh(stemGeo);
	// scene.add(stem);

	var points = THREE.GeometryUtils.randomPointsInGeometry(base.geometry, 100);
	var csd, fsd;
	var brush = brushFactory.createGlassBrush();
	paint();

	function paint(){
		var pts = _.sample(points, 2);
		csd = {
		  x: pts[0].x,
		  y: pts[0].y -35
		}
		fsd = {
			x: pts[1].x,
			y: pts[1].y -35
		}
		var strokeTween = new TWEEN.Tween(csd).
		  to(fsd, 2000).
		  onUpdate(function(){
		  	brush.position.set(csd.x, csd.y, 0);
		  }).start();

		 strokeTween.onComplete(function(){
		 	paint();
		 });
	}

}