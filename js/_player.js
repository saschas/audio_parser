jQuery(document).ready(function($){//////////////////////

// Player Settings
/////////////////////
var $player = $("#player");
var $player_src = $player.get(0);
	$player_src.round_duration = Math.round($player_src.duration);
var $player_info = {
	duration : $player_src.round_duration,
	currentTime : 0
}
	// Mute Audio
	//	$player_src.muted = true;

//////////////////////
// Timeline
/////////////////////

var $head_navi = $('.audioNav');
var $play_button = $('.play');
var $timeline = $('.time');
var $duration = $player_src.duration;
var $timeLineWidth = $head_navi.width()-100;

$play_button.bind({
	click : function(){
//////////////////
/////	Toggle Play
//////////////////
		if($player_src.paused){
			$(this).removeClass('off').addClass('on');
			$player_src.play();
			init();
		}
		else{
			$(this).removeClass('on').addClass('off');
			$player_src.pause();
			cancelAnimationFrame($loop);
		}
	}
});



$player.on({
	canplay : function(event) {
		
	},
	timeupdate: function(event){
		$player_info.currentTime = Math.round(this.currentTime)
		// group.children[$player_info.currentTime].material = new THREE.MeshBasicMaterial();
		// group.position.z = $player_info.currentTime;
	},
	play: function(event){
      	//init();
      	// $loop = render();
	    $player_src.playbackRate = 1;
	    //init();
	},
	pause : function(event){
		cancelAnimationFrame($loop);
	},
	ended : function(event){
    
	}
});

});

