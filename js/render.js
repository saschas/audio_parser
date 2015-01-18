
function render() {
  stats.begin();
  $player_info.currentTime = $player_src.currentTime;
		
  $timeline.height(calculateTimeline($player_info));
	  $loop = requestAnimationFrame( render ); 
		
		controls.update(1);

	  if(!$player_src.paused && userOpts.play){
	  	TWEEN.update();
	  }
	  renderer.render(scene, camera);


  stats.end();
  return $loop;
}
