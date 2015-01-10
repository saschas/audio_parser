//// IMPORTS 
#util_options
    MATH_ROT
        MATH_ROT * 'deg'
        Corrects the rotation in 3d Space
#user_options
#requestAnimationFrame
#loadAudio
    loads the audio JSON Object and kick of the animation
#three_setup
	stats
	camera
	scene // Definitly change later for multiple Scenes
	renderer
	controls
#tween_setup
	animation
#lights
    All lights in the scene

#add scene files
    _floor.js
        Floor of scene
    _cubes.js
        first 60 Data Sets of Audio Data render to cubeMap
    _grid.js
        for later use

#Audio Controls
_player.js
#index
	init();
#resize
    update projectionMatrix
#render
    the render loop 
    stats
    loop
    controls
    TWEEN.update


#ToDo
- Prepare render pipeline for multiple Scenes
    + Goal: createScene([timecode]);
        * Recognize real Audio currentTime
        * create new Scene
        * Import Obj in new scene
        * Add scene to renderer
        * Remove old scene after next scene is current
- Process AudioData in consumable chunks and make prediction when to load next files for playing smoothly
