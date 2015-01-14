var cube_options = {
  x_height : 1,
  y_height : 0.5,
  z_height : 1,
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


  cube_options.length  = audioData.data.length;
  playBack(audioData.data);
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

function calculatePercentage(curr){

  var percentage = curr  * 100 / 825;
  console.log('max = ' +12865,'curr = ' + curr, percentage);
};

function playBack(realsource){

  // Cuts the audioData into smaller chunks
  var chunklength = 1;
  var $stripes = stripe(chunklength,realsource);
  var $max =  10;//$stripes.length; //83
  var cubes_geometry = new THREE.Geometry();
  var box_material = new THREE.MeshPhongMaterial($phongMaterialOptions);
  var cube_count = 0;
  var cube_row = 0;

  var box_geometry = new THREE.BoxGeometry( cube_options.x_height, cube_options.y_height , cube_options.z_height );
  var cube = new THREE.Mesh( box_geometry, box_material );
          
  for(var i = 0;i < $max;i++){ // for all stripes to load // 83
    for (var chunk = 0;chunk < $stripes[i].length; chunk++) { // for chunklength // 10
      for(var single = 0;single <= 32; single++){ //length 32 realworld data
        if(single == 0){
          cube_row++;
          calculatePercentage(cube_row);
        }
        if($stripes[i][chunk][single] > 0){
          //console.log(cube_count +=2);
            cube.position.z = - (cube_options.z_height* cube_row); // row
            //console.log(cube.position.z);
            cube.position.x = single*cube_options.x_height * 1.1;
            cube.scale.y = $stripes[i][chunk][single] * .5;
          cube.updateMatrix();
          cubes_geometry.merge(cube.geometry,cube.matrix);
            cube.position.x = - single*cube_options.x_height * 1.1;
          cube.updateMatrix();
          cubes_geometry.merge(cube.geometry,cube.matrix);
        }
      }
    }//end of chunk
    
    
  }
  total = new THREE.Mesh(cubes_geometry,cube_material);
  total.castShadow = true;
  total.receiveShadow = true;
  scene.add(total);
}



