var Pond = function(){
  var brushRadius = .5;
  var brush = brushFactory.createPondBrush(brushRadius);
  var radius = 10
  var circleCenter = new THREE.Vector3(rightScreen - radius -15, skyHeight - radius - 1 );
  var p1, p2;
  var numPoints = 100
  var thetaLength = Math.PI * 2;
  var xScale = 2.5;
  brush.position.x = radius * xScale + circleCenter.x;
  brush.position.y =  circleCenter.y;
  brush.visible = true; 
  var currentPoint = 1;
  paintCircle();

  function paintCircle(){
    var angle = currentPoint/numPoints * thetaLength; 
    var newX = radius * xScale * Math.cos(angle) + circleCenter.x;
    var newY = radius  * Math.sin(angle) + circleCenter.y;
    var csd = {
      x: brush.position.x,
      y: brush.position.y
    }
    var fsd = {
      x: newX,
      y: newY
    }

    var strokeTween = new TWEEN.Tween(csd).
      to(fsd, 20).
      onUpdate(function(){
        brush.position.set(csd.x, csd.y, 0);
      }).start();

      strokeTween.onComplete(function(){
        currentPoint++;
        if(currentPoint > numPoints){
          radius -= brushRadius;
          currentPoint = 0;
        }
        paintCircle();
      });
  }
}