function color(){var e="rgb("+(Math.floor(255*Math.random())-150)+","+(Math.floor(255*Math.random())-150)+","+(Math.floor(255*Math.random())-150)+")";return e+""}function readyToPlayback(e){particle_options.length=e.data.length,playBack(e.data)}function stripe(e,t){var a,n,o,i=e,r=[];for(a=0,n=t.length;n>a;a+=i)o=t.slice(a,a+i),r.push(o);return r}function calculatePercentage(e){var t=100*e/audioData.data.length;return t.toFixed(0)}function playBack(e){var t=1,a=stripe(t,e);console.log("$stripes",a);var n=a.length,o=0,i=[];$playback_info.max=n;for(var r=0,s=0;n>s;s++)for(var l=0;l<a[s].length;l++)for(var c=0;32>=c;c++){if(0==c&&(o++,r!=calculatePercentage(o)&&(console.clear(),console.log(calculatePercentage(o)+"% loaded"),r=calculatePercentage(o))),a[s][l][c]>particle_options.threshold){var p=c*particle_options.size*.5,d=a[s][l][c]*particle_options.factor,m=-(particle_options.size*o),u=new THREE.Vector3(p,d,m);particles.vertices.push(u);var p=-c*particle_options.size*.5,d=a[s][l][c]*particle_options.factor,m=-(particle_options.size*o),u=new THREE.Vector3(p,d,m);particles.vertices.push(u)}particles.colors.push(new THREE.Color(Math.random(),1,.5))}particleSystem=new THREE.PointCloud(particles,pMaterial),console.log("particles ready! Click Play!"),particleSystem.receiveShadow=!0,particleSystem.castShadow=!0,console.log(particleSystem.geometry.vertices.length/2),scene.add(particleSystem)}function new_group(e,t){var a=this;a.options={material:{color:16777215,ambient:2236962,specular:0,shininess:2236962,wireframe:!1},position:{x:0,y:0,z:0},scale:{x:1,y:1,z:1},rotation:{x:0,y:0,z:0},margin:{x:.5,y:0,z:0}},a.group=function(){var e=new THREE.Object3D;return e},a.single=function(e,t){var a=new THREE.BoxGeometry(t.scale.x,t.scale.y,t.scale.z),n=new THREE.MeshPhongMaterial(t.material),o=new THREE.Mesh(a,n);return o.position.x=(t.scale.x+t.margin.x)*e,o.position.y=t.position.y,o.position.z=t.position.z,o},a.init=function(n){for(var o=a.group(),i=0;n>i;i++)o.add(a.single(i,a.options));return o.time_to_show=-e,o.time_range=e-t,o.update=function(){this.position.z=this.time_on_screen()},o.remove=function(){scene.remove(this)},o.time_on_screen=function(){return this.time_to_show<0?this.time_to_show++:(this.time_to_show=0,this.time_range++),0===this.time_range&&this.toMenu(),this.time_to_show},o.toMenu=function(){console.log("to menu"),this.position.y=e},o.position.z=this.time_to_show,o}}function init(e){void 0===$loop&&($loop=render())}function render(){return stats.begin(),$loop=requestAnimationFrame(render),controls.update(),$player_src.paused||TWEEN.update(),renderer.render(scene,camera),stats.end(),$loop}var MATH_ROT=-Math.PI/2,$loop,userOpts={ready:!1,range:1,duration:2500,delay:200,easing:"Elastic.EaseInOut",camera:{x:0,y:10,z:50,target:{x:0,y:10,z:-50}}},context;"undefined"!=typeof AudioContext?context=new AudioContext:"undefined"!=typeof webkitAudioContext&&(context=new webkitAudioContext);for(var lastTime=0,vendors=["ms","moz","webkit","o"],x=0;x<vendors.length&&!window.requestAnimationFrame;++x)window.requestAnimationFrame=window[vendors[x]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[vendors[x]+"CancelAnimationFrame"]||window[vendors[x]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(e,t){var a=(new Date).getTime(),n=Math.max(0,16-(a-lastTime)),o=window.setTimeout(function(){e(a+n)},n);return lastTime=a+n,o}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(e){clearTimeout(e),$time=0});var audioData={},data=$.ajax({dataType:"json",url:"js/audioData_4.json",data:function(e){},success:function(e){userOpts.ready=!0,audioData.data=e,readyToPlayback(audioData)}}),stats=new Stats;stats.setMode(0),stats.domElement.style.position="absolute",stats.domElement.style.right="0px",stats.domElement.style.top="0px",document.body.appendChild(stats.domElement);var scene=new THREE.Scene;scene.fog=new THREE.FogExp2(0,.005);var camera=new THREE.PerspectiveCamera(35,window.innerWidth/window.innerHeight,.5,1e3);camera.position.set(userOpts.camera.x,userOpts.camera.y,userOpts.camera.z),camera.lookAt(new THREE.Vector3(userOpts.camera.target.x,userOpts.camera.target.y,userOpts.camera.target.z)),camera.minDistance=0,camera.maxDistance=1/0,camera.minPolarAngle=0,camera.maxPolarAngle=Math.PI;var renderer=new THREE.WebGLRenderer({antialias:!0});renderer.setSize(window.innerWidth,window.innerHeight),renderer.setClearColor(0,0),renderer.shadowMapType=THREE.PCFSoftShadowMap,renderer.shadowMapEnabled=!0,renderer.shadowMapSoft=!0,renderer.shadowCameraFov=150,renderer.shadowMapBias=.1,renderer.shadowMapDarkness=.5,document.body.appendChild(renderer.domElement);var controls=new THREE.OrbitControls(camera);controls.rotateSpeed=.1,controls.keyPanSpeed=.001,controls.maxPolarAngle=Math.PI/2,controls.center=new THREE.Vector3(userOpts.camera.target.x,userOpts.camera.target.y,userOpts.camera.target.z),console.log();var $row=0,$seat=0,update=function(){$row++,custom_element.update(),particleSystem.position.z=$row;for(var e=0;32>e;e++)if(audioData.data[$row][e]>particle_options.threshold)for(var t=0;2>t;t++)$seat++,console.log($seat),particleSystem.geometry.colors[$seat].set(new THREE.Color("rgba(255,0,0,1)")),particleSystem.geometry.colorsNeedUpdate=!0},easing=TWEEN.Easing[userOpts.easing.split(".")[0]][userOpts.easing.split(".")[1]],jump_In=(new TWEEN.Tween).to({},userOpts.duration).delay(userOpts.delay).easing(easing).onUpdate(update);jump_In.start(),jump_In.chain(jump_In);var geometry=new THREE.BoxGeometry(100,1,1),material=new THREE.MeshPhongMaterial({color:16711680}),menu=new THREE.Mesh(geometry,material);camera.add(menu);var spotLight=new THREE.SpotLight(15658734);spotLight.position.set(50,200,50),spotLight.intensity=2,spotLight.castShadow=!0,spotLight.target.position.set(0,0,0),spotLight.shadowDarkness=.5,spotLight.shadowMapWidth=2048,spotLight.shadowMapHeight=2048,spotLight.shadowCameraNear=1,spotLight.shadowCameraFar=1e3,scene.add(spotLight);var sunLight=new THREE.SpotLight(16777215);sunLight.position.set(0,1e3,0),sunLight.intensity=.1,scene.add(sunLight);var rimLight=new THREE.SpotLight(16772778);rimLight.position.set(0,0,-500),rimLight.intensity=1,scene.add(rimLight);var frontLight=new THREE.SpotLight(16772778);frontLight.position.set(0,0,500),frontLight.intensity=.25,scene.add(frontLight);var ambientLight=new THREE.AmbientLight(2236962);scene.add(ambientLight);var plane_options={width:window.innerWidth,height:window.innerHeight,position:{x:0,y:-.25,z:0}},$phongMaterialOptions={color:2236962,ambient:0,specular:0,shininess:0,wireframe:!1},plane_geometry=new THREE.PlaneGeometry(plane_options.width,plane_options.height,32),plane_material=new THREE.MeshPhongMaterial($phongMaterialOptions),plane=new THREE.Mesh(plane_geometry,plane_material);plane.rotation.x=MATH_ROT,plane.position.x=plane_options.position.x,plane.position.y=plane_options.position.y,plane.position.z=plane_options.position.z,plane.receiveShadow=!0,scene.add(plane);var particles=new THREE.Geometry,particle,particleSystem,pMaterial=new THREE.PointCloudMaterial({color:13421772,vertexColors:THREE.VertexColors,size:1.5}),particle_options={size:1,factor:.015,threshold:6},total,row=0,$playback_info={},obj=new new_group(100,200),custom_element=obj.init(10);scene.add(custom_element),jQuery(document).ready(function($){function e(e){var t=Math.round(100*e.currentTime/e.duration),a=(window.innerHeight-100)*t/100;return a}var t=$("#player"),a=t.get(0);a.round_duration=Math.round(a.duration);var n={duration:a.round_duration,currentTime:0},o=$(".audioNav"),i=$(".play"),r=$(".time"),s=a.duration,l=o.width()-100;i.bind({click:function(){a.paused?($(this).removeClass("off").addClass("on"),a.play(),init()):($(this).removeClass("on").addClass("off"),a.pause())}}),t.on({canplay:function(e){},timeupdate:function(t){n.currentTime=Math.round(this.currentTime),r.height(e(n))},play:function(e){a.playbackRate=1},pause:function(e){},ended:function(e){}})}),window.onresize=function(){camera.aspect=window.innerWidth/window.innerHeight,camera.updateProjectionMatrix(),renderer.setSize(window.innerWidth,window.innerHeight)};var $player_src=$("#player").get(0);
//# sourceMappingURL=./master-min.js.map