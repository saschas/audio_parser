//////////////////////////////////////////////////////
//// Audio Data
//////////////////////////////////////////////////////



var data = $.ajax({
  dataType: "json",
  url: "js/audioData.json",
  data:function(data){
  	return data;
  },
  success: function(data){

	userOpts.ready = true;
	var obj = $.parseJSON(  );

	console.log(data.responseText)
  }
});

