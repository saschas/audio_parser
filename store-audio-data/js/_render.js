function render() {
  //stats.begin();
  storeData();
  $loop = requestAnimationFrame( render ); 	 
  //stats.end();
  return $loop;
}


function storeData(){
	analyser.getByteFrequencyData(realtimeData);
    var $transform_audioData = [];
	    for(var i=0;i< realtimeData.length;i++){
	      $transform_audioData.push(realtimeData[i]);
	    }
		
		$audioData.push($transform_audioData);    
}