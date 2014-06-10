var Village = function(){

  var radius = 9;
  var circleMat = new THREE.MeshBasicMaterial({color: 0xff00ff, transparent: true, opacity: 0.01});
  var circle = new THREE.Mesh(new THREE.CircleGeometry(radius, 20), circleMat);
  var xOffset = rightScreen - radius - 20;
  circle.position.x = xOffset;
  var scale = 2.5
  circle.scale.x = scale;
  var points = THREE.GeometryUtils.randomPointsInGeometry(circle.geometry, 20);
  // scene.add(circle);

  for(var i  = 0; i < points.length; i++){
  	var p = new THREE.Mesh(new THREE.CircleGeometry(1, 10));
    points[i].x = points[i].x * scale + xOffset;
  }


  //paint lots of house
  paintHouse();
  // var circleCenter = new THREE.Vector3(rightScreen - radius -15, skyHeight - radius - 1 );

  function paintHouse(){
  	//pick a random point in the points array
  	var point = _.sample(points);
  	points.splice(points.indexOf(point), 1);
  	var brush = createHouseBrush();
  	brush.position.set(point.x, point.y, 0);
    brush.visible = true;

  	var csd = {
  		y: brush.position.y,
  	}
  	var fsd = {
  		y: csd.y + randFloat(0.5, 1),
  	}

    var roofStart = (csd.y + fsd.y)/2;
  	var strokeTween = new TWEEN.Tween(csd).
  	  to(fsd, 1000).
  	  // easing(TWEEN.Easing.Cubic.In).
  	  onUpdate(function(){
  	  	brush.position.y = csd.y;
        brush.material.color.offsetHSL(randFloat(-.001, .001), 0, .001)
        //we're greater than halfway so make roof
        if(csd.y > roofStart){
          brush.scale.x -= .1;
        }
  	  }).start();

      strokeTween.onComplete(function(){
        if(points.length > 0){
          paintHouse();
        }
      });
  }

  function createHouseBrush(){
    var brushGeo = new THREE.CircleGeometry(.05, 20);
    var color = new THREE.Color(0x704e0d);
    color.offsetHSL(randFloat(-.01, 0.01), randFloat(-.01, 0.01), randFloat(0, 0.2));

    var brushMat = new THREE.MeshBasicMaterial({color: color, transparent: true, opacity: 0.7});
    var brush = new THREE.Mesh(brushGeo, brushMat);
    brush.scale.x = 5.
    brush.visible = false;
    scene.add(brush);
    return brush;
  }
}