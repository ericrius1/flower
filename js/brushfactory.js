var  BrushFactory = function(){
  var glassBrushes = [];
  var wineBrushes = []
  var landscapeBrushes = [];
  var skyBrushes = [];

  this.createLandscapeBrush = function(){
    var color1 = new THREE.Color(0x646b1e);
    var color2 = new THREE.Color(0x8f8b41);
    var brushGeo = new THREE.CircleGeometry(3, 20);
    var brushMat = new THREE.MeshBasicMaterial({color: color1, transparent: true, opacity: 0.2});
    var landscapeBrush= new THREE.Mesh(brushGeo, brushMat);
    landscapeBrush.colors = [color1, color2];
    landscapeBrushes.push(landscapeBrush);
    landscapeBrush.position.x = leftScreen;
    landscapeBrush.visible = false;
    scene.add(landscapeBrush);
    return landscapeBrush;
  }

  this.createLayerBrush = function(color, size){
    var brushGeo = new THREE.CircleGeometry(size, 30);
    var brushMat = new THREE.MeshBasicMaterial({color: color});
    var brush = new THREE.Mesh(brushGeo, brushMat);
    scene.add(brush);
    return brush;
  }
  this.createSkyBrush = function(){

    var brushGeo = new THREE.CircleGeometry(3, 20);
    var brushMat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.5});
    var skyBrush= new THREE.Mesh(brushGeo, brushMat);
    skyBrush.colors = [
       new THREE.Color(0x0b7386),
       new THREE.Color(0x0f69ac),
       new THREE.Color(0x18cca6),
    ];
    skyBrushes.push(skyBrush);
    skyBrush.position.x = leftScreen;
    skyBrush.visible = false;
    scene.add(skyBrush);
    return skyBrush;
  }

  this.glassBrushes = glassBrushes;
  this.wineBrushes = wineBrushes;
  this.landscapeBrushes = landscapeBrushes;
}