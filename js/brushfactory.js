var  BrushFactory = function(){
  var glassBrushes = [];
  var wineBrushes = []
  var landscapeBrushes = [];
  var skyBrushes = [];

  this.createBushBrush = function(){
    var brushGeo = new THREE.CircleGeometry(3, 6);
    var brushMat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.3});
    var landscapeBrush= new THREE.Mesh(brushGeo, brushMat);
    landscapeBrush.scale.x = 0.5
    landscapeBrush.colors = [
      new THREE.Color(0x51601b)
    ];
    landscapeBrushes.push(landscapeBrush);
    landscapeBrush.position.x = leftScreen;
    landscapeBrush.visible = false;
    scene.add(landscapeBrush);
    return landscapeBrush;
  }

  this.createStakeBrush = function(){
    var brushGeo = new THREE.CircleGeometry(1.5, 20);
    var brushMat = new THREE.MeshBasicMaterial({color: new THREE.Color(0x692f1d), transparent: true, opacity: 0.4});
    var stakeBrush = new THREE.Mesh(brushGeo, brushMat);
    stakeBrush.scale.x = .1;
    stakeBrush.scale.y =2.6
    stakeBrush.visible = false;
    scene.add(stakeBrush);
    return stakeBrush;
  }

  this.createGrapeBush = function(){
    var brushGeo = new THREE.CircleGeometry(.1, 20);
    var brushMat = new THREE.MeshBasicMaterial();
    var grapeBrush = new THREE.Mesh(brushGeo, brushMat);
    grapeBush.visible = false;
    scene.add(grapeBush);
    return grapeBush;
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