var cubes = new THREE.Object3D();
    var $groups = [];
    var oldData;

var cube_options = {
  x_height : 1,
  y_height : 1,
  z_height : 1,
  rotation: {
    x : 0,
    y : 0,
    z : 0
  },
  x : 0,
  y : .5,
  z : 0
}

function cube(args){
    var box_geometry = new THREE.BoxGeometry( args.x_height, args.y_height , args.z_height );
    var box_material = new THREE.MeshPhongMaterial({color : 0x333333});

    var cube = new THREE.Mesh( box_geometry, box_material );
    cube.castShadow = true;
    cube.receiveShadow = true;
    cube.position.x = args.x;
    cube.position.y = args.y;
    cube.position.z = args.z;
    cube.rotation.x = args.rotation.x;
    cube.rotation.y = args.rotation.y;
    cube.rotation.z = args.rotation.z;
    return cube;
  }


  function color(){ 
    var rgb =  'rgb(' + (Math.floor(Math.random() * 255)-150) + ',' + (Math.floor(Math.random() * 255)-150) + ',' + (Math.floor(Math.random() * 255)-150) + ')';
    return rgb + '';
  }

var smallerAudio = {};
function readyToPlayback(audioData){
  
  var curr = 0;
  for(i in audioData.data){

    if(i % 60 == 0){
      curr++;
    }
    
    if(!smallerAudio[curr]){
      smallerAudio[curr] = [audioData.data[i]]
    }
    else{
      smallerAudio[curr].push(audioData.data[i]);
    }
  }
  playBack(smallerAudio);
}

var cubes_count = 0;

function playBack(smallerAudio){
var row = 0;
var cube_count = 0;
  for (var i = 0; i < 60; i++) {
    row = i;
    for(var j in smallerAudio[1][i]){
      cube_count++;
      cube_options.z = - row * 1.1;
      cube_options.x = - 17 + j * 1.1;
      cube_options.y_height = smallerAudio[1][i][j] * .25;

      cubes.add(cube(cube_options));
    }   
  };
}
/*

for(var j = 0;j<20;j++){

  for (var i=1;i<=10;i++) {
    cube_options.x = i;
    cube_options.y= j +2;
    cube_options.rotation.x = Math.random();
    cube_options.rotation.y = Math.random();
    cube_options.rotation.z = Math.random();
    cubes_count++;
    cubes.add(cube(cube_options));
  }
  for (var i=1;i<=10;i++) {
    cube_options.x = -i;
    cube_options.rotation.x = Math.random();
    cube_options.rotation.y = Math.random();
    cube_options.rotation.z = Math.random();
    cubes_count++;
    cubes.add(cube(cube_options));
  }

}
*/

scene.add(cubes);