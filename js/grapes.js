var Grapes = function( vineDataz, scale){
	//a bunch of grapes 
  var vineData = vineDataz
  var color = new THREE.Color().setRGB(randFloat(0.6, 0.9), randFloat(0, 0.3), randFloat(0.6, 0.9));
  var brush = brushFactory.createGrapeBrush();
  brush.material.color = color;
  brush.scale.set(scale, scale, scale);
  var opacity = brush.material.opacity;
  paintRow();
  function paintRow(){
    brush.visible = true;
		populateVine();	
    function populateVine(){
      var vine = _.sample(vineData);
      vineData.splice(vineData.indexOf(vine), 1)
      brush.position.set(vine.x, vine.y, 0);
      paintVine()
      function paintVine(){

        //theres all this shit here because each grape should look a bit different
        setTimeout(function(){
          var tempColor = color.clone();
          tempColor.r += randFloat(-.1, .1)
          tempColor.b += randFloat(-.1, .1)
          var tempScale = scale + randFloat(-.1, .1);
          brush.scale.set(tempScale * 0.8, tempScale, tempScale);
          brush.material.color = tempColor;
          brush.material.opacity = opacity + randFloat(-.3, 0.3);
          brush.position.x += randFloat(-.2, .2)
          brush.position.y += randFloat(-.2, .2)
          paintVine();
        }, 50)
      }
    }
  }
}
