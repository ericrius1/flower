var Sky = function(){
  var strokeRange = 15;
  var skyBaseColor = new THREE.Color(0x01837f);
  var brush = brushFactory.createSkyBrush();
  brush.position.x = -1000

  firstLayer();

  function firstLayer(){
    var radius = 20;
    var layerBrush = brushFactory.createLayerBrush(skyBaseColor, radius);
    layerBrush.position.y = (topScreen-skyHeight)/2 + radius/2;
    var csd = {
      x: leftScreen-10
    };
    var fsd = {
      x: rightScreen
    }
    var strokeTween = new TWEEN.Tween(csd).
      to(fsd, baseLayerTime).
      onUpdate(function(){
        layerBrush.material.color.offsetHSL(0, 0, 0.0015);
        layerBrush.position.x = csd.x;
      }).start();
      strokeTween.onComplete(function(){
        scene.remove(layerBrush);
        // stroke();
      });
  }

	//pick random points close to each other
	function stroke(){
    brush.material.color = _.sample(brush.colors);
    var csd = {
      x:randFloat(leftScreen, rightScreen),
      y: randFloat(skyHeight, topScreen)
    }
    var fsd = {
      x: csd.x + randFloat(-strokeRange, strokeRange),
      y: csd.y + randFloat(-strokeRange, strokeRange)
    }
    brush.visible = true;
    var strokeTween = new TWEEN.Tween(csd).
      to(fsd, 100).
      onUpdate(function(){
        csd.y = Math.max(skyHeight + 5, csd.y)

        brush.position.set(csd.x, csd.y, 0);
      }).start();
    strokeTween.onComplete(function(){
      stroke();
    })

	}
}