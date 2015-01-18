/////////////////////////////////////////////////////
////  Light
////////////////////////////////////////////////////
var spotLight = new THREE.SpotLight( 0xeeeeee);

    spotLight.position.set( 50, 200, 50 );

    spotLight.intensity = 2;
    spotLight.castShadow = true;

    spotLight.target.position.set(0, 0, 0 );
    spotLight.shadowDarkness = 0.5;

    spotLight.shadowMapWidth = 2048; // default is 512
    spotLight.shadowMapHeight = 2048; // default is 512
    spotLight.shadowCameraNear = 1; 
    spotLight.shadowCameraFar = 1000;

    scene.add(spotLight);
              
    //scene.add( spotLight );
//////////////////
//// Sun light
/////////////////
var sunLight = new THREE.SpotLight( 0xffffff);
    sunLight.position.set( 0,1000,0 );
    sunLight.intensity = .4;
    scene.add( sunLight );

//////////////////
////  Back Light
/////////////////
///Sits in the back
var rimLight = new THREE.SpotLight( 0xffeeaa);
    rimLight.position.set( 0,0,-500 );
    rimLight.intensity = 1;
    scene.add( rimLight );
//////////////////
////  Front Light
/////////////////
///Sits in the front
var frontLight = new THREE.SpotLight( 0xffeeaa);
    frontLight.position.set( 0,0,500 );
    frontLight.intensity = .25;
    scene.add( frontLight );
//////////////////
////  Ambient Light
/////////////////
var ambientLight = new THREE.AmbientLight(0xcccccc);
    scene.add(ambientLight);

   