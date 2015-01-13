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
  y : -.25,
  z : 0
}

var $phongMaterialOptions = {
  color : 0x333333,
  ambient : 0x222222,
  specular : 0,
  shininess : 0x222222,
  wireframe : true
}

function cube(args){
    var box_geometry = new THREE.BoxGeometry( args.x_height, args.y_height , args.z_height );
    //console.log(box_geometry);
    var box_material = new THREE.MeshPhongMaterial($phongMaterialOptions);
   // THREE.GeometryUtils.merge(geometry, otherGeometry);

    var cube = new THREE.Mesh( box_geometry, box_material );
    cube.castShadow = true;
    cube.receiveShadow = true;
    cube.position.x = args.x;
    cube.position.y = args.y;
    cube.position.z = args.z;
    cube.rotation.x = args.rotation.x;
    cube.rotation.y = args.rotation.y;
    cube.rotation.z = args.rotation.z;
    //console.log(cube);
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

    /// Streamcounter
    /// 30 Pieces of data

    if(i % 30 == 0){
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

      /// Minimum thickness
      if(smallerAudio[1][i][j] === 0){
        smallerAudio[1][i][j] = .1;
      }
      cube_options.y_height = smallerAudio[1][i][j] * .25;

      cubes.add(cube(cube_options));
    }   
  };
}

//scene.add(cubes);