var WineGlass = function(){
  var color = new THREE.Color().setHSL(335/360, .89, .32)	
  var p,y;
  var glassGeo = new THREE.Geometry();
  var startingX = -25;
  var endingX = 25;
  var middleX = (endingX + startingX)/2;
  var topGlass, bottomGlass;
  var points = [];
  var p1, p2;

  var glassFuncX = function(x){
    return Math.pow(x,2)/20 - 40;
  }
  var glassFuncY = function(y){
  	return Math.sqrt((20*(y+40)));
  }

  var brushGeo = new THREE.SphereGeometry(1);
  var brushMat = new THREE.MeshBasicMaterial({color: color, transparent: true, opacity: 0.1});
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
    var point;
	  for(y = topGlass; y > bottomGlass; y-=5){
		  rightSide = glassFuncY(y);
		  leftSide = -rightSide;
		  for(var x = leftSide; x < rightSide; x+=5){
        point = new THREE.Vector3(x, y, 0);
        points.push(point);
			  createDebugPoint(point);

		  }
	  }
  }

  this.paint = function(){
    //pick two random points and move brush from the first to the second
    var pts = _.sample(points,2);
    var curStrokeData = {
      x: pts[0].x, 
      y: pts[0].y
    }
    var finalStrokeData = {
      x: pts[1].x,
      y: pts[1].y
    }
    var strokeTween = new TWEEN.Tween(curStrokeData).
      to(finalStrokeData, 2000).
      easing(TWEEN.Easing.Cubic.Out).
      onUpdate(function(){
        console.log(curStrokeData)
        brush.position.set(curStrokeData.x, curStrokeData.y, 0);
      }).start()
  }
}

function createDebugPoint(position){
	var sphereGeo = new THREE.SphereGeometry(.1);
	var sphere = new THREE.Mesh(sphereGeo);
	sphere.position = position;
	scene.add(sphere);

}