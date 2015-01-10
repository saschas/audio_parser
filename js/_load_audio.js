//////////////////////////////////////////////////////
//// Audio Data
//////////////////////////////////////////////////////

var audioData = {}

var data = $.ajax({
  dataType: "json",
  url: "js/audioData_2.json",
  data:function(data){
  	//return data;
  },
  success: function(data){

	userOpts.ready = true;
	//var obj = $.parseJSON(data.responseText);
  audioData.data = data;

    readyToPlayback(audioData);
  }
});

