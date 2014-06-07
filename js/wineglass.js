var WineGlass = function(){
  var p,y;
  var glassGeo = new THREE.Geometry();
  var startingX = -25;
  var endingX = 25;
  var middleX = (endingX + startingX)/2;
  this.equation = function(x){
    return Math.pow(x,2)/20 - 40;
  }
  for(var x = startingX; x < endingX; x+=.1){
    //We need to save bottom of the glass
    y = this.equation(x);
    if( Math.floor(x) === middleX){
      this.bottom = y;
    }
    p = new THREE.Vector3(x, y, 0);
    glassGeo.vertices.push(p);
  }
  //Save the top of the glass
  this.top = p.y; 
  var wineMat = new THREE.LineBasicMaterial({color: new THREE.Color(0xff00ff), linewidth: 5})
  var wineGlass = new THREE.Line(glassGeo, wineMat);
  scene.add(wineGlass);
  console.log(this);
}