var group_grid = new THREE.Object3D();

var grid_options = {
  x_height : .5,
  y_height : 12.5,
  z_height : .5,
  x : 0,
  y : 5,
  z : 0
}

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


  function color(){ 
    var rgb =  'rgb(' + (Math.floor(Math.random() * 255)-150) + ',' + (Math.floor(Math.random() * 255)-150) + ',' + (Math.floor(Math.random() * 255)-150) + ')';
    return rgb + '';
  }

  group_grid.add(grid(grid_options));
//scene.add(group_grid);