/////////////////////////////////////////////////////
////  Light
////////////////////////////////////////////////////
var spotLight = new THREE.SpotLight( 0xffffff);
    spotLight.position.set( 0, 100, 0 );
    spotLight.intensity = 5;
    spotLight.castShadow = true;

    spotLight.target.position.set(0, 0, 0 );
    spotLight.shadowDarkness = 0.5;

    spotLight.shadowMapWidth = 2048; // default is 512
    spotLight.shadowMapHeight = 2048; // default is 512
    spotLight.shadowCameraNear = 1; 
    spotLight.shadowCameraFar = 1000;

    scene.add(spotLight);
              
    //scene.add( spotLight );

var sunLight = new THREE.SpotLight( 0xffffff);
    sunLight.position.set( 0,1000,0 );
    sunLight.intensity = .1;
    scene.add( sunLight );


///Sits in the back
var rimLight = new THREE.SpotLight( 0xffeeaa);
    rimLight.position.set( 0,0,-500 );
    rimLight.intensity = 1;
    scene.add( rimLight );

///Sits in the front
var frontLight = new THREE.SpotLight( 0xffeeaa);
    frontLight.position.set( 0,0,500 );
    frontLight.intensity = .25;
    scene.add( frontLight );

   var ambientLight = new THREE.AmbientLight(0x222222);
   scene.add(ambientLight);

   document.body.appendChild( renderer.domElement );