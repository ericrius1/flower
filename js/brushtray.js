var  BrushTray = function(){
  var glassBrushes = [];
  var wineBrushes = []

  createGlassBrush();
  createWineBrush();


  function createGlassBrush(){
    var color = new THREE.Color().setHSL(252/360, .05, .45) 
    var brushGeo = new THREE.SphereGeometry(1);
    var brushMat = new THREE.MeshBasicMaterial({color: color, transparent: true, opacity: 0.1});
    var glassBrush= new THREE.Mesh(brushGeo, brushMat);
    glassBrushes.push(glassBrush);
    glassBrush.visible = false;
    scene.add(glassBrush);

  }

  function createWineBrush(){
    var color = new THREE.Color().setHSL(335/360, .89, .32) 
    var brushGeo = new THREE.SphereGeometry(2);
    var brushMat = new THREE.MeshBasicMaterial({color: color, transparent: true, opacity: 0.1});
    var wineBrush= new THREE.Mesh(brushGeo, brushMat);
    wineBrushes.push(wineBrush);
    wineBrush.visible = false;
    scene.add(wineBrush);
  }

  this.glassBrushes = glassBrushes;
  this.wineBrushes = wineBrushes;
}