var baseLayerTime = 2000;

var Landscape = function(){
  var startingLight = randFloat(.3, .5);
  var endingLight = randFloat(0.1, 0.3)
  var sky = new Sky(startingLight, endingLight);
  var field = new Field(startingLight, endingLight);
  setTimeout(function(){
    var pond =new Pond();
  }, baseLayerTime);
 
}