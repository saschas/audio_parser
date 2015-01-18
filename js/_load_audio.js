//////////////////////////////////////////////////////
//// Audio Data
//////////////////////////////////////////////////////

var audioData = {}

$.ajax({
  dataType: "json",
  url: "js/audioData_4.json",
  success: function(data){

	userOpts.ready = true;

  å.store_data(data);
  
  loading_stack(å); 
    // this function runs if data is ready to playback
    // this function has to do the following:
    //  1. split data array in consumable chunks
    //  2. call a function with argument array[chunk,chunk,...]
  }
});

