var Grapes = function(){
	//a bunch of grapes 
  var self = this;
	this.paintRow = function(vineDataz){
    var id =0;
    self.vineData = vineDataz
    var brush = brushFactory.createGrapeBrush();
    brush.visible = true;
		brush.id = id++
    console.log("BRUSH ID",brush.id);
		self.populateVine(brush);	
  }
  this.populateVine = function(brush){
    var vine = _.sample(self.vineData);
		brush.position.set(vine.x, vine.y, 0);
		self.vineData.splice(self.vineData.indexOf(vine), 1)
		setTimeout(function(){
			if(self.vineData.length > 0){
				console.log('BRUSH ID', brush.id)
				self.populateVine(brush);
			}	
		}, 100)
	}
}
