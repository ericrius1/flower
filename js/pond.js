var Pond = function(){
  var brush = brushFactory.createPondBrush();
  var radius = 7;
  var circleCenter = new THREE.Vector3(rightScreen - radius -10, skyHeight - radius - 3 );
  var p1, p2;
  var numPoints = 100
  var thetaLength = Math.PI * 2;
  var xScale = 1.5;
  brush.position.x = radius * xScale + circleCenter.x;
  brush.position.y =  circleCenter.y;
  brush.visible = true; 
  var currentPoint = 1;
  paintCircle();

  function paintCircle(){
    brush.material.color.r = Math.random();
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
      to(fsd, 10).
      onUpdate(function(){
        brush.position.set(csd.x, csd.y, 0);
      }).start();

      strokeTween.onComplete(function(){
        currentPoint++;
        if(currentPoint <= numPoints){
          paintCircle();
        }
        else{
          radius -= 1;
        }
      });
  }
}