// create the particle variables
var particles = new THREE.Geometry(),
    particle,
    particleSystem,
    pMaterial = new THREE.PointCloudMaterial({
      color: 0xcccccc,
      /*,
      transparent : true,opacity: 0.7,*/
      vertexColors: THREE.VertexColors,
      size: 1.5
      /*,
      map : THREE.ImageUtils.loadTexture(
        "./assets/img/bars.png"
      )*/
    }),
    particle_options = {
      size : 1,
      factor : .015,
      threshold : 6
    };

var total;
var row = 0;
function readyToPlayback(audioData){
  particle_options.length  = audioData.data.length;
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

  var percentage = curr  * 100 / 27022;
  return percentage.toFixed(0);
};

var $playback_info = {};

function playBack(realsource){
  // Cuts the audioData into smaller chunks
  var chunklength = 1;
  var $stripes = stripe(chunklength,realsource);
  var $max = $stripes.length; //83
  var cube_row = 0;

    // vertex colors
var colors = [];
 $playback_info.max = $max;

    // random color
    
/**/
// material
var $last = 0;
  for(var i = 0;i < $max;i++){ // for all stripes to load // 83
    for (var chunk = 0;chunk < $stripes[i].length; chunk++) { // for chunklength // 10
      for(var single = 0;single <= 32; single++){ //length 32 realworld data
        
        if(single == 0){ 
          cube_row++;
          
          if($last != calculatePercentage(cube_row)){
            console.clear();
            console.log(calculatePercentage(cube_row) + '% loaded');
           $last = calculatePercentage(cube_row); 
          }          
        }
        if($stripes[i][chunk][single] > particle_options.threshold){
          // create a particle with random
          // position values, -250 -> 250

            //console.log(randomX);
            var pX = single * particle_options.size * 0.5,
                pY = $stripes[i][chunk][single] * particle_options.factor,
                pZ = - (particle_options.size* cube_row),
                particle = new THREE.Vector3(pX, pY, pZ);

            // add it to the geometry
            particles.vertices.push(particle);
            var pX = -single * particle_options.size * 0.5,
                pY = $stripes[i][chunk][single] *  particle_options.factor,
                pZ = - (particle_options.size* cube_row),
                particle = new THREE.Vector3(pX, pY, pZ);

            particles.vertices.push(particle);
            particles.colors.push(new THREE.Color(Math.random(), 1.0, 0.5 ));
          }//end of if
          
        }
    }//end of chunk    
  }
  // create the particle system
    particleSystem = new THREE.PointCloud(particles,pMaterial);
    //particleSystem.sortParticles = true;
console.log('particles ready! Click Play!');
particleSystem.receiveShadow = true;
particleSystem.castShadow = true;
// add it to the scene
scene.add(particleSystem);
}










