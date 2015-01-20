var $row = 0;
var $seat = 0;
var update	= function(){

	//global speed
	$row++;
	models_to_update.forEach(function(e){
		//console.log(e);
		e.update();
	});


	terrain.position.z += 1;
	
}

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
