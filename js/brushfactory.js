var  BrushFactory = function(){
  var glassBrushes = [];
  var wineBrushes = []
  var landscapeBrushes = [];

  this.createGlassBrush = function(){
    var color = new THREE.Color().setHSL(252/360, .05, .45) 
    var brushGeo = new THREE.SphereGeometry(1);
    var brushMat = new THREE.MeshBasicMaterial({color: color, transparent: true, opacity: 1});
    var glassBrush= new THREE.Mesh(brushGeo, brushMat);
    glassBrushes.push(glassBrush);
    scene.add(glassBrush);
    return glassBrush;
  }

  this.createWineBrush = function(){
    var color = new THREE.Color().setHSL(335/360, .89, .32) 
    var brushGeo = new THREE.SphereGeometry(2);
    var brushMat = new THREE.MeshBasicMaterial({color: color, transparent: true, opacity: 0.1});
    var wineBrush= new THREE.Mesh(brushGeo, brushMat);
    wineBrushes.push(wineBrush);
    scene.add(wineBrush);
    return wineBrush;
  }

  this.createLandscapeBrush = function(){
    var color = new THREE.Color(0x646b1e);
    var brushGeo = new THREE.SphereGeometry(5);
    var brushMat = new THREE.MeshBasicMaterial({color: color, transparent: true, opacity: 0.5});
    var landscapeBrush= new THREE.Mesh(brushGeo, brushMat);
    landscapeBrushes.push(landscapeBrush);
    scene.add(landscapeBrush);
    landscapeBrush.visible = false;
    return landscapeBrush;
  }

  this.glassBrushes = glassBrushes;
  this.wineBrushes = wineBrushes;
  this.landscapeBrushes = landscapeBrushes;
}