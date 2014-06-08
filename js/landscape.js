var Landscape = function(){

  currentY = 0;
  setTimeout(function(){
    stroke();
  }, 100)

  function stroke(){
    var brush =brushFactory.createLandscapeBrush();
    brush.visible = true
    var csd = {
      x: leftScreen
    };
    var fsd = {
      x: rightScreen
    };
    var strokeTween = new TWEEN.Tween(csd).
      to(fsd, 2000).
      onUpdate(function(){
        brush.material.color = _.sample(brush.colors);
        var y = Math.sin(csd.x/10)* 2 + currentY
        brush.position.set(csd.x, y, 0)
      }).start();
      
      strokeTween.onComplete(function(){
        currentY -= 5;
        if(currentY > bottomScreen){
          stroke();
        }
      });
  }
}