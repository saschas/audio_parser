
var update	= function(){

	for (var i = 0, len = cubes_count; i < len; i++) {
		console.log(i);
		cubes.children[i].rotation.y += 0.1;
	}
}

console.log(data);
	// remove previous tweens if needed	TWEEN.removeAll();	

// convert the string from dat-gui into tween.js functions 
var easing	= TWEEN.Easing[userOpts.easing.split('.')[0]][userOpts.easing.split('.')[1]];
// build the tween to go ahead

var jump_In = new TWEEN.Tween()
	.to({}, userOpts.duration)
	.delay(userOpts.delay)
	.easing(easing)
	.onUpdate(update);

/*
var tweenHead	= new TWEEN.Tween(current)
	.to({x: +userOpts.range}, userOpts.duration)
	.delay(userOpts.delay)
	.easing(easing)
	.onUpdate(update);

// build the tween to go backward
var tweenBack	= new TWEEN.Tween(current)
	.to({
		x: - userOpts.range,
		y: userOpts.range
	}, userOpts.duration)
	.delay(userOpts.delay)
	.easing(easing)
	.onUpdate(update);
*/
//jump_In.chain(tweenHead);
// after tweenHead do tweenBack
//tweenHead.chain(tweenBack);
// after tweenBack do tweenHead, so it is cycling
//tweenBack.chain(tweenHead);
// start the first


jump_In.start();
jump_In.chain(jump_In);
//tweenHead.start();

