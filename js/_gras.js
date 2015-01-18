var line_Material = new THREE.LineBasicMaterial({
	color: 0xff0000
});
    // random color
    var grasGroup = new THREE.Object3D();

    var line_material = new THREE.LineBasicMaterial({
    	color: 0x0000ff
    });

    var line_options = {
    	x : 10,
    	y : 0,
    	z : 0
    }

    var line_geometry = new THREE.Geometry();
    line_geometry.vertices.push(new THREE.Vector3(-line_options.x, line_options.y, line_options.z));

    for(var i = 0;i<32;i++){
    	line_options.x = 0;
    	line_options.y = 0;
    	line_options.z = 0;

    	line_geometry.vertices.push(new THREE.Vector3(line_options.x, line_options.y, line_options.z));
    }
    
    line_geometry.vertices.push(new THREE.Vector3(line_options.x, line_options.y, line_options.z));

    var line = new THREE.Line(line_geometry, line_material);
    grasGroup.add(line);

    scene.add(grasGroup);







/*
function playBack(realsource){
  // Cuts the audioData into smaller chunks
  var chunklength = 1;
  var $stripes = stripe(chunklength,realsource);
  console.log('$stripes', $stripes)
  var $max = $stripes.length; //83
  var cube_row = 0;

    // vertex colors
    var colors = [];
    $playback_info.max = $max;

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
//
            //console.log(randomX);          

            var pX = single * particle_options.size * 0.5,
            pY = $stripes[i][chunk][single] * particle_options.factor,
            pZ = - (particle_options.size * cube_row),
            particle = new THREE.Vector3(pX, pY, pZ);



            // add it to the geometry
            particles.vertices.push(particle);
            var pX = -single * particle_options.size * 0.5,
            pY = $stripes[i][chunk][single] *  particle_options.factor,
            pZ = - (particle_options.size * cube_row),
            particle = new THREE.Vector3(pX, pY, pZ);

            particles.vertices.push(particle);

          }//end of if
          particles.colors.push(new THREE.Color(Math.random(), 1.0, 0.5 ));

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
    console.log(particleSystem.geometry.vertices.length / 2);
    scene.add(particleSystem);
  }

  */