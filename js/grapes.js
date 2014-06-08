var Grapes = function(color, vineDataz){
	//a bunch of grapes 
  var vineData = vineDataz
  var brush = brushFactory.createGrapeBrush();
  brush.material.color = color;
  this.paintRow = function(){
    brush.visible = true;
		populateVine();	
    function populateVine(){
      var vine = _.sample(vineData);
      console.log(brush.material.color.r)
  		brush.position.set(vine.x, vine.y, 0);
  		vineData.splice(vineData.indexOf(vine), 1)
  		setTimeout(function(){
  			if(vineData.length > 0){
  				populateVine(brush);
  			}	
  		}, 500)
  	}
  }
}
