var cube_options = {
  x_height : 2,
  y_height : 0.5,
  z_height : 4,
  rotation: {
    x : 0,
    y : 0,
    z : 0
  },
  x : 0,
  y : 0,
  z : 0
};

var $phongMaterialOptions = {
  color : 0x333333,
  ambient : 0x222222,
  specular : 0,
  shininess : 0x222222,
  wireframe : false
};
var cube_material = new THREE.MeshPhongMaterial($phongMaterialOptions);

var group = new THREE.Object3D();
var total;
var row = 0;
function readyToPlayback(audioData){

  // Cuts the audioData into smaller chunks
  var $stripes = stripe(10,audioData.data);

  cube_options.length  = audioData.data.length;
  
  for(var i = 0;i<$stripes.length;i++){
    var $stripe_mesh = playBack(i,$stripes[i]);
    // console.log($stripe_mesh);
        total = new THREE.Mesh($stripe_mesh,cube_material);
        total.castShadow = true;
        total.receiveShadow = true;
        total.position.z = i * -4.95;
    group.add(total);
  }
  scene.add(group);
}

// Slice function for the data
// cut in small chunks
function stripe(count,data){
  var i,j,stripe,chunk = count;
  var stripeArray = [];

  for (i=0,j=data.length; i<j; i+=chunk) {
    stripe = data.slice(i,i+chunk);
    stripeArray.push(stripe);
  }
  return stripeArray;
}

function single_cube(cube_options){
  var box_geometry = new THREE.BoxGeometry( cube_options.x_height, cube_options.y_height , cube_options.z_height );
  var cube = new THREE.Mesh( box_geometry, box_material );
      cube.position.x = -cube_options.x_height;
      cube.position.z = -cube_options.z_height;
      cube.scale.y = realsource[i][j];        
      cube.updateMatrix();
  return cube;
}


function calculatePercentage(curr){

  var percentage = curr  * 100 / 12865;
  console.log('max = ' +12865,'curr = ' + curr, percentage);
};

function playBack(row,realsource){
  var cubes_geometry = new THREE.Geometry();
  var box_material = new THREE.MeshPhongMaterial($phongMaterialOptions);
  var cube_count = 0;
    //Stripes to load //16
    var $max = realsource.length;
    
    for (var i = 0;i < $max; i++) {
      for(var j = 0;j < 32; j++){

        calculatePercentage(row * j * i);
        if( realsource[i][j] < 0.1){
          //return false; // realsource[i][j] = 0.1;
        }
        else{
           
        var box_geometry = new THREE.BoxGeometry( cube_options.x_height, cube_options.y_height , cube_options.z_height );
        var cube = new THREE.Mesh( box_geometry, box_material );            
            cube.position.x = -j * 1.5;
            cube.scale.y = realsource[i][j] * 0.05;   
            cube.position.z = -cube_options.z_height * 1.1 * i;          
                 
            cube.updateMatrix();
            cubes_geometry.merge(cube.geometry,cube.matrix);
        }
      }
    }
    return cubes_geometry;
  }

