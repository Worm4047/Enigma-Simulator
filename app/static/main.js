$(document).ready(function(){
	console.log("Ready");

	$.ajax({
	  type : 'GET',
	  url : "/getRotorInfo",
	  contentType: 'application/json',
	})
	.done(updateRotorInfo); 	

	$(document).keypress(function(e){
		let ch = e.key;
		console.log(ch);
		$("#" + ch).addClass("glow");
		setTimeout(function(){ $("#" + ch).removeClass("glow"); }, 200);
		$.ajax({
		  type : 'POST',
		  url : "/encrypt",
		  contentType: 'application/json',
		  data : JSON.stringify({'data':ch})
		})
		.done(updateRotorInfo);  		
	})

	function updateRotorInfo(res){
		res = JSON.parse(res);
		

		let rotor = JSON.parse(res['data']);
		if( res['ch']!= undefined){
			let ch = res['ch'];
			$('.headertext span').append(ch);
		}
		$('.r1 span').text(`Rotor ${rotor['r1'][0]}`);
		$('.r2 span').text(`Rotor ${rotor['r3'][0]}`);
		$('.r3 span').text(`Rotor ${rotor['r2'][0]}`);
		$('.r1 textarea').text(`${rotor['r1'][1]}`);
		$('.r2 textarea').text(` ${rotor['r2'][1]}`);
		$('.r3 textarea').text(`${rotor['r3'][1]}`);
	}
});