var Landscape = function(){

  currentY = bottomScreen + 20;
  var brush =brushFactory.createLandscapeBrush();
  brush.material.color = _.sample(brush.colors);
  brush.position.x = -1000
  firstLayer();
  var yIncrement = 5;
  var waveFactor = randFloat(2, 5);

  function firstLayer(){
    var color = new THREE.Color(0x708428);
    var radius = 31;
    var layerBrush = brushFactory.createLayerBrush(color, radius);
    layerBrush.position.y = -20
    var csd = {
      x: leftScreen-10
    }
    var fsd = {
      x: rightScreen
    }
    var strokeTween = new TWEEN.Tween(csd).
      to(fsd, baseLayerTime).
      onUpdate(function(){
        layerBrush.position.x = csd.x;
        layerBrush.material.color.offsetHSL(0, 0, 0.001);
      }).start()
    strokeTween.onComplete(function(){
      scene.remove(layerBrush);
      brush.visible = true;
      stroke();
    })
  }

  function stroke(){
    // brush.material.color.offsetHSL(0, 0, .02);
    var csd = {
      x: leftScreen-5
    };
    var fsd = {
      x: rightScreen + 5
    };

    var strokeTween = new TWEEN.Tween(csd).
      to(fsd, 3000).
      onUpdate(function(){
        brush.position.x = csd.x;
        brush.position.y = Math.sin(csd.x /20) * waveFactor + currentY
      }).start();
      
      strokeTween.onComplete(function(){
        if(currentY < skyHeight - 10){
          yIncrement *= 0.9; 
          currentY += yIncrement;
          brush.scale.multiplyScalar(0.9)
          stroke();
        }
      });
  }
}