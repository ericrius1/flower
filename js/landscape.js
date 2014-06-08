var Landscape = function(){
	var brush = brushFactory.createLandscapeBrush();
  var csd, fsd;
  var currentX = leftScreen;
  setTimeout(function(){
    brush.visible = true;
    stroke();
    
  }, 1000)

  function stroke(){
    csd = {
      y: bottomScreen
    };
    fsd = {
      y: topScreen
    };
    var strokeTween = new TWEEN.Tween(csd).
      to(fsd, 1000).
      onUpdate(function(){
        brush.position.set(currentX, csd.y, 0)
      }).start();
      
      strokeTween.onComplete(function(){
        currentX+=10;
        if(currentX < rightScreen){
          stroke();
        }
      });
  }
}