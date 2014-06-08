var Landscape = function(){

  currentY = bottomScreen;
  var brush =brushFactory.createLandscapeBrush();
  brush.material.color = _.sample(brush.colors);
  brush.position.x = -1000
  firstLayer();

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
      to(fsd, 1000).
      onUpdate(function(){
        brush.position.set(csd.x, currentY, 0)
      }).start();
      
      strokeTween.onComplete(function(){
        currentY += 5;
        if(currentY < skyHeight - 20){
          stroke();
        }
      });
  }
}