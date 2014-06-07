var WineGlass = function(){
  var color = new THREE.Color().setHSL(335/360, .89, .32)	
  var p,y;
  var glassGeo = new THREE.Geometry();
  var startingX = -25;
  var endingX = 25;
  var middleX = (endingX + startingX)/2;
  var topGlass, bottomGlass;
  var glassFuncX = function(x){
    return Math.pow(x,2)/20 - 40;
  }
  var glassFuncY = function(y){
  	return Math.sqrt((20*(y+40)));
  }

  var brushGeo = new THREE.SphereGeometry(1);
  var brushMat = new THREE.MeshBasicMaterial({color: color});
  var brush = new THREE.Mesh(brushGeo, brushMat);
  brush.scale.x = 0.5
  scene.add(brush);


	  for(var x = startingX; x < endingX; x+=.1){
	    //We need to save bottom of the glass
	    y = glassFuncX(x);
	    if( Math.floor(x) === middleX){
	      bottomGlass= y;
	    }
	    p = new THREE.Vector3(x, y, 0);
	    glassGeo.vertices.push(p);
	  }
	  //Save the top of the glass
	  topGlass = p.y; 
	  cachePointsInGlass();
	  var wineMat = new THREE.LineBasicMaterial({color: new THREE.Color(0xff00ff), linewidth: 5})
	  var wineGlass = new THREE.Line(glassGeo, wineMat);
	  scene.add(wineGlass);
  
  function cachePointsInGlass (){
	  var leftSide, rightSide;
	  for(y = topGlass; y > bottomGlass; y-=1){
		  rightSide = glassFuncY(y);
		  leftSide = -rightSide;
		  for(var x = leftSide; x < rightSide; x+=1){
			  createDebugPoint(new THREE.Vector3(x, y, 0));
		  }
	  }
  }


  this.paint = function(){
    brush.position.x +=.1;
  	
  }
}

function createDebugPoint(position){
	var sphereGeo = new THREE.SphereGeometry(.1);
	var sphere = new THREE.Mesh(sphereGeo);
	sphere.position = position;
	scene.add(sphere);

}