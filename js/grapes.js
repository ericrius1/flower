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

var GrapeTest = function(){
    var brush = brushFactory.createGrapeBrush();
    brush.visible = true
    var scale = 10;
    brush.scale.multiplyScalar(scale);
    brush.scale.x = scale * 0.7
    var radius = brush.geometry.boundingSphere.radius * scale;
    //Use recursive algorithms to create grapes- nucleus's which others spawn from
    var nucleus = {position: brush.position.clone(), radius: brush.geometry}
    var numGrapes = 10;
    var thetaLength = Math.PI * 2;
    var points  = [];
    var pointIndex = 0;
    for(var i =0; i < numGrapes; i++){
      var segment = 0 + i / numGrapes * thetaLength;
        var x = Math.cos(segment) * (radius);
        var y = Math.sin(segment) * (radius) * 1.5;
        points.push(new THREE.Vector2(x, y));
        x = Math.cos(segment) * (radius * 2.5);
        y = Math.sin(segment) * (radius*2.5) * 1.5;
    }
    setTimeout(function(){
      spawnGrape();
    }, 10)
    function spawnGrape(){
      //pick any angle
      var point = _.sample(points);
      points.splice(points.indexOf(point), 1);
      brush.position.set(point.x, point.y, 0);
      brush.material.color = new THREE.Color().setHSL(Math.random(), Math.random(), .5)
      setTimeout(function(){
        if(points.length > 0){
          spawnGrape();
        }
      }, 50)

    }

}
