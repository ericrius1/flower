var Bell  = function(){

  var points = [];

  var radius = 10;
  var numPoints = 200;
  var thetaLength = Math.PI * 2;
  for(var i = 0; i < numPoints; i++){
    var angle = i/numPoints * thetaLength;
    var x = Math.cos(angle) * radius;
    var z = Math.sin(angle) * radius;
    var position = new THREE.Vector3(x, 0, z);
    createPoint(position);
  }



  this.update = function(){


  }
}