var WineGlass = function(){
  var self = this;
  var p,y;
  var glassGeo = new THREE.Geometry();
  var startingX = -25;
  var endingX = 25;
  var middleX = (endingX + startingX)/2;
  var topGlass, bottomGlass;
  var points = [];
  var p1, p2;
  var glassBrush = brushTray.glassBrushes[0];
  var wineBrush = brushTray.wineBrushes[0];
  debugger;


  var glassFuncX = function(x){
    return Math.pow(x,2)/20 - 40;
  }
  var glassFuncY = function(y){
  	return Math.sqrt((20*(y+40)));
  }

  //should stroking style be coupled to brushes or wineglass?
  this.paintGlass = function(){
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

    //Now go through each point pair and stroke it


    function cachePointsInGlass (){
      var leftSide, rightSide;
      var point;
      for(y = topGlass; y > bottomGlass; y-=1){
        rightSide = glassFuncY(y);
        leftSide = -rightSide;
        for(var x = leftSide; x < rightSide; x+=1){
          point = new THREE.Vector3(x, y, 0);
          points.push(point);
          // createDebugPoint(point);

        }
      }
    }
  }

  this.paintWine = function(){
    //pick two random points and move brush from the first to the second
    var pts = _.sample(points,2);
    var curStrokeData = {
      x: pts[0].x, 
      y: pts[0].y,
      size: wineBrush.scale.x
    }
    var finalStrokeData = {
      x: pts[1].x,
      y: pts[1].y,
      size: wineBrush.scale.x * 1.5
    }
    var strokeTween = new TWEEN.Tween(curStrokeData).
      to(finalStrokeData, 1).
      easing(TWEEN.Easing.Quadratic.InOut).
      onUpdate(function(){
        wineBrush.position.set(curStrokeData.x, curStrokeData.y, 0);
        wineBrush.scale.set(curStrokeData.size, curStrokeData.size, curStrokeData.size)
      }).start()

    strokeTween.onComplete(function(){
      wineBrush.scale.set(1,1,1)
      wineBrush.material.color.offsetHSL(randFloat(-0.01, 0.01), 0, randFloat(-0.01, 0.01))
      self.paintWine();
    });
  }
}

function createDebugPoint(position){
	var sphereGeo = new THREE.SphereGeometry(.1);
	var sphere = new THREE.Mesh(sphereGeo);
	sphere.position = position;
	scene.add(sphere);

}