var Landscape = function(){
	var texture = THREE.ImageUtils.loadTexture('assets/countrysidestyle.jpg');
	var planeGeo = new THREE.PlaneGeometry(140, 80);
	var planeMat = new THREE.MeshBasicMaterial({map: texture});
	var plane = new THREE.Mesh(planeGeo, planeMat);
	scene.add(plane)
	


	this.update = function(){
		// renderer.render(imageScene, camera);
	}

}