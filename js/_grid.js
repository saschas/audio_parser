var group_grid = new THREE.Object3D();

function grid(args){
    var box_geometry = new THREE.BoxGeometry( args.x_height, args.y_height , args.z_height );
    var box_material = new THREE.MeshLambertMaterial({color : 0xff0000});

    var line = new THREE.Mesh( box_geometry, box_material );
        line.castShadow = true;
        line.receiveShadow = true;
        line.position.x = args.x;
        line.position.y = args.y;
        line.position.z = args.z;
    return line;
  }

var $abstand = 0.5;
for(var i=0;i<32;i++){
  var grid_options = {
    x_height : .5,
    y_height : 1,
    z_height : .3,
    x : i * $abstand,
    y : -.25,
    z : 0
  }
  group_grid.add(grid(grid_options));
}
for(var i=0;i<32;i++){
  var grid_options = {
    x_height : .5,
    y_height : 1,
    z_height : .3,
    x : -i * $abstand,
    y : -.25,
    z : 0
  }
  group_grid.add(grid(grid_options));
}

group_grid.receiveShadow = true;
group_grid.castShadow = true;
scene.add(group_grid);