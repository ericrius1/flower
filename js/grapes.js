var Grapes = function(){
	
	var vineData;
	var brush = brushFactory.createGrapeBrush();
	//a bunch of grapes 
	this.paintRow = function(vineDataz){
		vineData = vineDataz;
		populateVine();
	}
	var populateVine = function(){
	    var brush = brushFactory.createGrapeBrush();
		var vine = _.sample(vineData);
		console.log(vineData.length)
		brush.position.set(vine.x, vine.y, 0);
        brush.visible = true;
		vineData.splice(vineData.indexOf(vine), 1)
		if(vineData.length > 0){
			populateVine();
		}

	}
}