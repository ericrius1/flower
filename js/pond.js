var Pond = function(colors){
  //colors to sample from;
  var colors = colors;
  var brushRadius = 5;
  var brush = brushFactory.createPondBrush(brushRadius);
  var baseBrushColor = brush.material.color.clone();
  var radius = 7
  var circleCenter = new THREE.Vector3(rightScreen - radius -15, skyHeight - radius - 5);
  var p1, p2;
  var numPoints = 100
  var thetaLength = Math.PI * 2;
  var xScale = 2.5;
  brush.position.x = radius * xScale + circleCenter.x;
  brush.position.y =  circleCenter.y;
  brush.visible = true; 
  var currentPoint = 1;
  paintBaseLayer();


  function paintBaseLayer(){
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
        if(Math.random() < 0.1){
          // brush.material.color = _.sample(colors).clone();
        }
        else{
          brush.material.color = baseBrushColor;
        }
        brush.position.set(csd.x, csd.y, 0);
      }).start();

      strokeTween.onComplete(function(){
        currentPoint++;
        if(currentPoint > numPoints && radius > brushRadius){
          radius -= brushRadius * 0.8;
          currentPoint = 0;
        }
        paintBaseLayer();
      });
  }
}