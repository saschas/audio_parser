var $row = 0;
var $seat = 0;
var update	= function(){

	//global speed
	$row++;
	custom_element.update();
	particleSystem.position.z = $row;

		for(var i=0;i<32;i++){
			if(audioData.data[$row][i] > particle_options.threshold){
				//wenn größer null und auf beiden seiten :/
				for(var j=0;j<2;j++){
					//particles.colors.push(new THREE.Color(Math.random(), 1.0, 0.5 ));
					$seat++;
					console.log($seat);
				//	console.log(particleSystem.geometry.colors[$seat]);
					particleSystem.geometry.colors[$seat].set(new THREE.Color("rgba(255,0,0,1)"));
					particleSystem.geometry.colorsNeedUpdate = true;
				}
			}
		}
}
	// remove previous tweens if needed	TWEEN.removeAll();	

// convert the string from dat-gui into tween.js functions 
var easing	= TWEEN.Easing[userOpts.easing.split('.')[0]][userOpts.easing.split('.')[1]];
// build the tween to go ahead

var jump_In = new TWEEN.Tween()
	.to({}, userOpts.duration)
	.delay(userOpts.delay)
	.easing(easing)
	.onUpdate(update);

//tweenHead.start();
jump_In.start();
jump_In.chain(jump_In);
