function orbit_controls(userOpts,camera){
//  console.log('orbit');
var controls = new THREE.OrbitControls( camera );
    controls.rotateSpeed = userOpts.camera.fly.rotateSpeed;
    controls.keyPanSpeed = userOpts.camera.fly.keyPanSpeed;
    controls.maxPolarAngle = Math.PI/2;
    controls.center = new THREE.Vector3(userOpts.camera.target.x,userOpts.camera.target.y,userOpts.camera.target.z);
    return controls;
}


function fly_controls(userOpts,camera){
//    console.log('fly');
var controls = new THREE.FlyControls( camera );
    controls.movementSpeed = userOpts.camera.fly.movementSpeed;
    controls.domElement = renderer.domElement;
    controls.rollSpeed = userOpts.camera.fly.rollSpeed;
    controls.autoForward = userOpts.camera.fly.autoForward;
    controls.dragToLook = userOpts.camera.fly.dragToLook;

    return controls;
}


function trackball_controls(userOpts,camera){
//    console.log('trackball');
var controls = new THREE.TrackballControls( camera );
    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;

    controls.noZoom = false;
    controls.noPan = false;

    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;

    controls.keys = [ 65, 83, 68 ];
    return controls;
}
/////////////////////////////////////////////////////
//////  Controls
/////////////////////////////////////////////////////
function camera_switch(userOpts,type){


var prevCamera = camera;
    
    camera = new THREE.PerspectiveCamera();
    //console.log(camera);
    camera.position.copy( prevCamera.position );
    camera.rotation.copy( prevCamera.rotation );

    var TYPE = { 
        ORBIT: 'orbit',
        FLY: 'fly',
        TRACKBALL : 'trackball'
    };

    switch( type ) {

        case TYPE.ORBIT:

            controls = new THREE.OrbitControls( camera );

            type = TYPE.ORBIT;

            break;

        case TYPE.FLY:

            controls = fly_controls(userOpts,camera)
            
            type = TYPE.FLY;

            break;
        case TYPE.TRACKBALL:

            controls = trackball_controls(userOpts,camera)
            
            type = TYPE.FLY;

            break;
    }
}
///////////////////////////////////////////////////////////
/////////// Default camera
///////////////////////////////////////////////////////////
var controls = fly_controls(userOpts,camera);
///////////////////////////////////////////////////////////
/////////// Events
///////////////////////////////////////////////////////////
var $_orbit = $('.controls-orbit');
var $_fly = $('.controls-fly');
var $_trackball = $('.controls-trackball');

$_orbit.bind({
    click: function(){
        camera_switch(userOpts,'orbit');
    }
});
$_fly.bind({
    click: function(){
        camera_switch(userOpts,'fly');
        console.log('fly');
    }
});
$_trackball.bind({
    click: function(){
        camera_switch(userOpts,'trackball');
        console.log('trackball');
    }
});
