var Village = function(endingLight){
  var endingLight = endingLight;
  var radius = 7;
  var circleMat = new THREE.MeshBasicMaterial({color: 0xff00ff, transparent: true, opacity: 0.01});
  var circle = new THREE.Mesh(new THREE.CircleGeometry(radius, 20), circleMat);
  var xOffset = rightScreen - radius - 20;
  circle.position.x = xOffset;
  var scale = 2.5
  circle.scale.x = scale;
  var points = THREE.GeometryUtils.randomPointsInGeometry(circle.geometry, 40);
  // scene.add(circle);
  var minX = -radius * scale + xOffset
  var maxX = radius * scale + xOffset
  console.log("minx", minX)
  console.log("maxX", maxX)
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
    var offsetHue = randFloat(-.005, 0);
    console.log(endingLight)
    var offsetLight = map(point.x, minX, maxX, 0, -.02/endingLight);
    console.log(offsetLight)
    brush.material.color.offsetHSL(0, 0, offsetLight);

  	var csd = {
  		y: brush.position.y,
  	}
  	var fsd = {
  		y: csd.y + randFloat(0.8, 1.4),
  	}

    var roofStart = (csd.y + fsd.y)/2;
  	var strokeTween = new TWEEN.Tween(csd).
  	  to(fsd, 500).
  	  easing(TWEEN.Easing.Quadratic.In).
  	  onUpdate(function(){
  	  	brush.position.y = csd.y;
        //we're greater than halfway so make roof
        if(csd.y > roofStart){
          brush.material.color.offsetHSL(offsetHue, 0, 0)
          brush.scale.x -= .2;
        }
  	  }).start();

      strokeTween.onComplete(function(){
        if(points.length > 0){
          paintHouse();
        }
      });
  }

  function createHouseBrush(){
    var brushGeo = new THREE.CircleGeometry(.1, 20);
    var color = new THREE.Color(0x704e0d);
    color.offsetHSL(randFloat(-.1, 0.01), randFloat(-.01, 0.01), 0);

    var brushMat = new THREE.MeshBasicMaterial({color: color, transparent: true, opacity: 0.7});
    var brush = new THREE.Mesh(brushGeo, brushMat);
    brush.scale.x = 5.
    brush.visible = false;
    scene.add(brush);
    return brush;
  }
}