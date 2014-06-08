var Field = function(startingLight, endingLight){

  var currentY = bottomScreen - 5;
  var vineBrush =brushFactory.createVineBrush();
  vineBrush.material.color = _.sample(vineBrush.colors);
  vineBrush.position.x = -1000;
  var brushScaleFactor = 0.90

  var stakeBrush = brushFactory.createStakeBrush();
  stakeBrush.position.x = -1000;

  firstLayer();
  var waveFactor = 10
  var yIncrement = 7;
  var tweenTime = 1000;
  var grapes = new Grapes();


  function firstLayer(){
  	// var bAdd = .001
  	var rAdd = randFloat(0.002, 0.007);
  	var gSub = randFloat(0.001, 0.003);
    var color = new THREE.Color(0x80b428);
    var radius = 31;
    var layerBrush = brushFactory.createLayerBrush(color, radius);
    layerBrush.position.y = -20
    var csd = {
      x: leftScreen
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
      vineBrush.visible = true;
      stakeBrush.visible = true;
      stroke();
    })
  }

  function stroke(){
    // vineBrush.material.color.offsetHSL(0, 0, .02);
    var csd = {
      x: leftScreen-5
    };
    var fsd = {
      x: rightScreen + 5
    };
    var vineData = [];

    var strokeTween = new TWEEN.Tween(csd).
      to(fsd, tweenTime).
      onUpdate(function(){
        var yPos = -Math.sin(csd.x /60) * waveFactor + currentY;
        var xPos = csd.x;
        vineBrush.position.set(xPos, yPos, 0);
        stakeBrush.position.set(xPos, yPos, 0);
        vineData.push({x: xPos, y: yPos});
      }).start();
      
      strokeTween.onComplete(function(){
        grapes.paintRow(vineData, vineBrush.scale.length());
        if(currentY < skyHeight - 15){
          yIncrement *= brushScaleFactor; 
          tweenTime *= 1.1;
          currentY += yIncrement;
          vineBrush.scale.multiplyScalar(brushScaleFactor)
          stakeBrush.scale.multiplyScalar(brushScaleFactor)
          stroke();
        }
      });
  }
}