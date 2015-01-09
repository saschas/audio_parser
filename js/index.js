 // Future-proofing...
    var context;
    if (typeof AudioContext !== "undefined") {
        context = new AudioContext();
    } else if (typeof webkitAudioContext !== "undefined") {
        context = new webkitAudioContext();
    } else {
        //return;
    }

    // Overkill - if we've got Web Audio API, surely we've got requestAnimationFrame. Surely?...
    // requestAnimationFrame polyfill by Erik M�ller
    // fixes from Paul Irish and Tino Zijdel
    // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
    // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame']
                                    || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function (callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function () { callback(currTime + timeToCall); },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
            $time = 0;
        };

    
    var $loop;

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
//////////////////////////////////////////
    //   Camera
//////////////////////////////////////////
    var camera = new THREE.PerspectiveCamera( 35, window.innerWidth/window.innerHeight, 0.5, 1000 );
        camera.position.y = 1;
        camera.position.z = 5.5;
//////////////////////////////////////////
    //   Renderer
//////////////////////////////////////////
    var renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.setClearColor( 0xcccccc, 0 );
        renderer.shadowMapType = THREE.PCFSoftShadowMap;

        renderer.shadowMapEnabled = true;
        renderer.shadowMapSoft = true;
        renderer.shadowCameraFov = 150;

        renderer.shadowMapBias = 0.1;
        renderer.shadowMapDarkness = 0.5;

//////////////////////////////////////////
    //   Controls
//////////////////////////////////////////
    var controls = new THREE.OrbitControls( camera );
        controls.rotateSpeed = 0.1;
        controls.keyPanSpeed = 0.001;


//////////////////////////////////////////
    //   Resize
//////////////////////////////////////////
window.onresize = function(){
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}
/////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////// Plane
/////////////////////////////////////////////////////////////////////////////////////////////////
      var plane_geometry = new THREE.PlaneGeometry( window.innerWidth, window.innerHeight, 32 );
      var plane_material = new THREE.MeshLambertMaterial({color: 0xcccccc, side: THREE.DoubleSide}); 
      var plane = new THREE.Mesh( plane_geometry, plane_material ); 
          plane.rotation.x = -Math.PI / 2;
          plane.receiveShadow = true;
          scene.add( plane );


/////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////// Light
/////////////////////////////////////////////////////////////////////////////////////////////////
     var spotLight = new THREE.SpotLight( 0xffffff,1 );
         spotLight.position.set( 5,40, 10 );
          
         spotLight.castShadow = true;
          
         spotLight.target.position.set(0, 0, 0 );
         spotLight.shadowDarkness = 0.5;
          
          spotLight.shadowMapWidth = 2048; // default is 512
          spotLight.shadowMapHeight = 2048; // default is 512
         spotLight.shadowCameraNear = 1; 
         spotLight.shadowCameraFar = 50;
          
        scene.add( spotLight );


   // scene.fog = new THREE.FogExp2( 0xcccccc, 0.05 );


    var ambientLight = new THREE.AmbientLight(0xaaaaaa);
        scene.add(ambientLight);
    
    document.body.appendChild( renderer.domElement );      

    


/////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////// Audio Data
/////////////////////////////////////////////////////////////////////////////////////////////////

var $_AUDIO_STREAM = {};
$.getJSON( "js/audioData.json", function( audio_data ) {
  $_AUDIO_STREAM.data = audio_data;
  //$loop = render();
  // init();
});


//////////////////////////////// Audio
/////////////////////////////////////////////////////////////////////////////////////////////////
var group;
var currCount = 0;
var $max = 10; 
var onScreen = [];

var $player = $('#player');

var $duration = $player.get(0).duration;

var $timeLineWidth = $('#audioNav').width()-100;




  $player.on({
      canplay : function() {
        
      },
      timeupdate: function(event){
        
        // collectAudioData.tick();
        // 

        displayAudioData();
      },
      play: function(){
        $loop = render();
        console.log('play');

          $player.get(0).playbackRate = 1;
        init();        
      },
      pause : function(){
          $('.output').empty();
          //cancelAnimationFrame($loop);
      },
      ended : function(){
        collectAudioData.audioDataInConsole();
      }
  })
  $('#audioNav').bind({
      click : function(e){
        var $currentTime = Math.round((e.clientX-100) * 100 / $timeLineWidth);
        var $x = $currentTime*0.01*$timeLineWidth;
        
        $('.time').css('width', $x);

        $player.get(0).currentTime = $duration * $currentTime/100;
      }
  });


  $("#audioNav .play").bind({
    click : function(){
      if($player.get(0).paused){
        $(this).removeClass('off').addClass('on');
        $player.get(0).play();
      }
      else{
        $(this).removeClass('on').addClass('off');
        $player.get(0).pause();
        $('.output').empty();
          // cancelAnimationFrame($loop);
      }
      
    }
  });
  $("#audioNav .pause").bind({
    click : function(){
      $player.get(0).pause();
    }
  });


  //Each timeupdate
  function collectAudioData(){
      var analyser,
          frequencyData,
          source;
      var $audioStream = [];
      this.init = function(){
        // Create the analyser
      var analyser = context.createAnalyser();
          analyser.fftSize = 64;
  
      // Get the frequency data and
      var frequencyData = new Uint8Array(analyser.frequencyBinCount);
  
      // Set source
      var source = context.createMediaElementSource($player.get(0));
          source.connect(analyser);
          analyser.connect(context.destination);
    
      // store it in the audioStream Object for later use
      };
      //timeupdate
      this.tick = function(){
        console.log(this.init);
        if(!this.init){
          this.init;
        }
        // get audio Data
        analyser.getByteFrequencyData(frequencyData);
  
        // store audio Data in $audioStream Object for later use
        $audioStream.push(frequencyData);
  
        // look at http://bgrins.github.io/devtools-snippets/#console-save for saving the object
        // console.save(temp1,audioData.json)
      }
      this.audioDataInConsole = function(){
          console.log($audioStream);
      }
    };



  var group = new THREE.Object3D();
  var $groups = [];
  var oldData;


  function init(x){

    for (var t in $_AUDIO_STREAM.data) {
          
      var z = -t;
      if(t<30){
        for (var i in $_AUDIO_STREAM.data[t]) {
          var x = i;
          var y = $_AUDIO_STREAM.data[t][i];
          group.add(cube(x, y ,z));  
        } 
      }
       
    }
    scene.add(group);
  }
  var $data = [];


  function displayAudioData(){
    group.position.z +=.1;


    var $currentTime = Math.round($(this).get(0).currentTime * 100 / $timeLineWidth );
    var $x = $currentTime*0.01*$timeLineWidth;
        $('.time').css({width: $currentTime});
    

    // console.log('displayAudioData');
  }

  function animation(){
      //For each group - row
      //console.log('tick');

      
    for (var t in $_AUDIO_STREAM.data){
       //console.log(group);
      //group.children[t].position.z = -10.5
    }
    /*
    if(group.children.length>0){
      var j = 0;

        for(var i=0;i<1024;i++){
          if(j<frequencyData.length-1){
            j++;
          }
          else{
            
            j = 0;
          }
          group.children[i]
          if(group.children[i].position.z > 5){
            group.children[i].position.z = -10.5;

          }
          else{
            group.children[i].position.z += .1;
          }
          group.children[i].scale.y = frequencyData[j] * .2;
        }
    }
    */
    controls.update();
  }
  
  function cube(x,y,z){
    var box_geometry = new THREE.BoxGeometry( .4, .4 , .4 );
    var box_material = new THREE.MeshPhongMaterial();

    var cube = new THREE.Mesh( box_geometry, box_material );
        cube.castShadow = true;
        cube.receiveShadow = true;
        cube.position.x = x;
        cube.position.z = z;
        cube.scale.y = y;
      return cube;
  }


  function color(){ 
    var rgb =  'rgb(' + (Math.floor(Math.random() * 255)-150) + ',' + (Math.floor(Math.random() * 255)-150) + ',' + (Math.floor(Math.random() * 255)-150) + ')';
    return rgb + '';
  }

  function render() {
    stats.begin();
    $loop = requestAnimationFrame( render );    
    stats.end();
    animation();
    renderer.render(scene, camera);
    return $loop;
  };
  camera.lookAt(new THREE.Vector3(0,0,0));
