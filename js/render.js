var $player_src = $("#player").get(0);
function render() {
  stats.begin();
	  $loop = requestAnimationFrame( render ); 
	  controls.update();

	  if(!$player_src.paused){
	  	TWEEN.update();
	  }
	  renderer.render(scene, camera);
  stats.end();
  return $loop;
}
