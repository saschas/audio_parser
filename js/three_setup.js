//////////////////////////////////////////
    //   Three.js
//////////////////////////////////////////
    var stats = new Stats();
        stats.setMode(0); // 0: fps, 1: ms

        // align top-left
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.right= '0px';
        stats.domElement.style.top = '0px';

    document.body.appendChild( stats.domElement );
  
    // revolutions per second
    var scene = new THREE.Scene();
        // scene.fog = new THREE.FogExp2( 0x000000, 0.005 );
//////////////////////////////////////////
    //   Camera
//////////////////////////////////////////

    var camera = new THREE.PerspectiveCamera( 35, window.innerWidth/window.innerHeight, 0.5, 1000 );
        camera.minDistance = 0;
        camera.maxDistance = Infinity;
        camera.rotation.z = Math.sin(camera.rotation.y)/3.5;
        camera.minPolarAngle = 0; // radians
        camera.maxPolarAngle = Math.PI; // radians
       
        camera.position.set(userOpts.camera.x,userOpts.camera.y,userOpts.camera.z);
        camera.lookAt(new THREE.Vector3(userOpts.camera.target.x,userOpts.camera.target.y,userOpts.camera.target.z));
        
//////////////////////////////////////////
    //   Renderer
//////////////////////////////////////////
    var renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.setClearColor( 0x000000, 0 );
        renderer.shadowMapType = THREE.PCFSoftShadowMap;

        renderer.shadowMapEnabled = true;
        renderer.shadowMapSoft = true;
        renderer.shadowCameraFov = 150;

        renderer.shadowMapBias = 0.1;
        renderer.shadowMapDarkness = 0.5;
    document.body.appendChild( renderer.domElement );
//////////////////////////////////////////
    //   Controls
//////////////////////////////////////////
    
    /*var controls = new THREE.FlyControls( camera )
    //attaches fly controls to the camera
                controls = new THREE.FlyControls( camera );
                //camera control properties
                controls.movementSpeed = 1;
                controls.domElement = renderer.domElement;
                controls.rollSpeed = 0.01;
                controls.autoForward = false;
                controls.dragToLook = true;;*/
