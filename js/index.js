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

    // Create the analyser
    var analyser = context.createAnalyser();
        analyser.fftSize = 64;
    var frequencyData = new Uint8Array(analyser.frequencyBinCount);
  
  
    // Set up the visualisation elements
   
    var barSpacingPercent = 100 / analyser.frequencyBinCount;
  
    var $array = [];
    for (var i = 0; i < analyser.frequencyBinCount; i++) {
      $array.push(i * barSpacingPercent);
    }
  
    // Get the frequency data and update the visualisation
  
    var $audioData = [];
    var $loop;

    var stats = new Stats();
    stats.setMode(0); // 0: fps, 1: ms

    // align top-left
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.right= '0px';
    stats.domElement.style.top = '0px';

    document.body.appendChild( stats.domElement );
  
    // revolutions per second
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 35, window.innerWidth/window.innerHeight, 0.5, 1000 );
        camera.position.y = 1;
        camera.position.z = 5.5;
    var renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.setClearColor( 0xcccccc, 0 );
        renderer.shadowMapType = THREE.PCFSoftShadowMap;

        renderer.shadowMapEnabled = true;
        renderer.shadowMapSoft = true;
        renderer.shadowCameraFov = 150;

        renderer.shadowMapBias = 0.1;
        renderer.shadowMapDarkness = 0.5;

    var controls = new THREE.OrbitControls( camera );
        controls.rotateSpeed = 0.1;
        controls.keyPanSpeed = 0.001;
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
         spotLight.position.set( 5,3, 10 );
   /*       
         spotLight.castShadow = true;
          
         spotLight.target.position.set(0, 0, 0 );
         spotLight.shadowDarkness = 0.5;
          
          spotLight.shadowMapWidth = 4096; // default is 512
          spotLight.shadowMapHeight = 4096; // default is 512
         spotLight.shadowCameraNear = 1; 
         spotLight.shadowCameraFar = 50;
 */         
        scene.add( spotLight );


   // scene.fog = new THREE.FogExp2( 0xcccccc, 0.05 );


    var ambientLight = new THREE.AmbientLight(0xaaaaaa);
        scene.add(ambientLight);
    
    document.body.appendChild( renderer.domElement );      

    

/////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////// Audio
/////////////////////////////////////////////////////////////////////////////////////////////////
var group;
var currCount = 0;
var $max = 10; 
var onScreen = [];
var $duration = $("#player").get(0).duration;

var $timeLineWidth = $('#audioNav').width()-100;

var source = context.createMediaElementSource($("#player").get(0));
    source.connect(analyser);
    analyser.connect(context.destination);

  $("#player").on({
      canplay : function() {
        
      },
      timeupdate: function(event){
        
        analyser.getByteFrequencyData(frequencyData);
        var $currentTime = Math.round($(this).get(0).currentTime * 100 / $timeLineWidth );
        var $x = $currentTime*0.01*$timeLineWidth;
        $('.time').css({width: $currentTime});

      },
      play: function(){
        $loop = render();
        init();
        $("#player").get(0).muted = true;
      },
      pause : function(){
          $('.output').empty();
          cancelAnimationFrame($loop);
      }
  })
  $('#audioNav').bind({
      click : function(e){
        var $currentTime = Math.round((e.clientX-100) * 100 / $timeLineWidth);
        var $x = $currentTime*0.01*$timeLineWidth;
        
        $('.time').css('width', $x);

        $("#player").get(0).currentTime = $duration * $currentTime/100;
      }
  });


  $("#audioNav .play").bind({
    click : function(){
      if($("#player").get(0).paused){
        $(this).removeClass('off').addClass('on');
        $("#player").get(0).play();
      }
      else{
        $(this).removeClass('on').addClass('off');
        $("#player").get(0).pause();
        $('.output').empty();
          cancelAnimationFrame($loop);
      }
      
    }
  });
  $("#audioNav .pause").bind({
    click : function(){
      $("#player").get(0).pause();
    }
  });


  var group = new THREE.Object3D();
  var $groups = [];
  var oldData;
  
  function init(x){
    
    $.each(frequencyData,function(j){

      $.each(frequencyData,function(i){
        var z = -j*.5;
        var x = i*.5  + .5;
        if(frequencyData[i] === 0){
          group.add(cube(x, .01 ,z));
        }
        else{
          group.add(cube(x, frequencyData[i] ,z));
        }

      });
      scene.add(group);
    
     }); 

    
  }
  var $data = [];
  function anim(){
      //For each group - row
      //console.log('tick')
    if(group.children.length>0){
      var j = 0;
      $.each(group.children,function(i){
        
        if(j<frequencyData.length-1){
          j++;
        }
        else{
          
          j = 0;
        }

        if(this.position.z > 5){
          this.position.z = -10.5;

        }
        else{
          this.position.z += .1;
        }
        this.scale.y = frequencyData[j] * .2;

      });
    }

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
    anim();
    renderer.render(scene, camera);
    return $loop;
  };
  camera.lookAt(new THREE.Vector3(0,0,0));
