var Landscape = function(){

  currentY = bottomScreen+ 20;
  var bushBrush =brushFactory.createBushBrush();
  bushBrush.material.color = _.sample(bushBrush.colors);
  bushBrush.position.x = -1000;

  var stakeBrush = brushFactory.createStakeBrush();
  stakeBrush.position.x = -1000;

  firstLayer();
  var waveFactor = randFloat(2, 5);
  var yIncrement = 5;
  var tweenTime = 1000;

  function firstLayer(){
    var color = new THREE.Color(0x80b428);
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
        layerBrush.material.color.offsetHSL(randFloat(-0.0015, -0.00015), 0, randFloat(-0.001, -0.0001));
      }).start()
    strokeTween.onComplete(function(){
      scene.remove(layerBrush);
      bushBrush.visible = true;
      stakeBrush.visible = true;
      stroke();
    })
  }

  function stroke(){
    // bushBrush.material.color.offsetHSL(0, 0, .02);
    var csd = {
      x: leftScreen-5
    };
    var fsd = {
      x: rightScreen + 5
    };

    var strokeTween = new TWEEN.Tween(csd).
      to(fsd, tweenTime).
      onUpdate(function(){
        var yPos = Math.sin(csd.x /40) * waveFactor + currentY;
        bushBrush.position.set(csd.x, yPos, 0);
        stakeBrush.position.set(csd.x, yPos, 0);
      }).start();
      
      strokeTween.onComplete(function(){
        if(currentY < skyHeight - 10){
          yIncrement *= 0.9; 
          tweenTime *= 1.1;
          currentY += yIncrement;
          bushBrush.scale.multiplyScalar(0.9)
          stakeBrush.scale.multiplyScalar(0.9)
          stroke();
        }
      });
  }
}