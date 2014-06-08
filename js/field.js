var Field = function(startingLight, endingLight){

  var currentY = bottomScreen+ 20;
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
  	// var bAdd = .001
  	var rAdd = 0.005
  	var gSub = 0.001
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
        var light = map(csd.x, leftScreen, rightScreen, startingLight, endingLight);
        hsl = layerBrush.material.color.getHSL();
        layerBrush.material.color.setHSL(hsl.h, hsl.s, light);
        // layerBrush.material.color.b += bAdd;
        layerBrush.material.color.r += rAdd;
         layerBrush.material.color.g += gSub;
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