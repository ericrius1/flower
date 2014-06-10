var Village = function(){


	function paintHouse(){

	}

	function createHouseBrush(){
		var brushGeo = new THREE.CircleGeometry(1, 20);
		var brushMat = new THREE.MeshBasicMaterial({color: new THREE.Color(0x704e0d)});
		var brush = new THREE.Mesh(brushGeo, brushMat);
		brush.visible = false;
		scene.add(brush);
	}
}