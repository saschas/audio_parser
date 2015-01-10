function render() {
  stats.begin();
	  $loop = requestAnimationFrame( render ); 
	  controls.update();
	  TWEEN.update();  
	  renderer.render(scene, camera);
  stats.end();
  return $loop;
}
