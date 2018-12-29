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
		if(!isAlphaOrParen(ch))
			return;
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

	$('.uparrow').click(function(e){
		e.preventDefault();
		$('.plugscontainer').removeClass('bottom');
		$('.container').slideUp(500);
		$('.plugscontainer').show();
	})

	$('.closeplugs').click(function(e){
		e.preventDefault();
		$('.plugscontainer').hide();
		$('.container').slideDown(500);
	})

	$('.rotor_text').click(function(e){
		let id =parseInt($(e.target).attr('id'));
		var ids = [];
		$(".rotor").find("span").each(function(){ if(this.id != '') ids.push(parseInt(this.id)); });
		let data = {'ids' : ids, 'curr' : id}
		$.ajax({
		  type : 'POST',
		  url : "/changerotor",
		  contentType: 'application/json',
		  data : JSON.stringify(data)
		})
		.done(updateRotorInfo);  
	})

	$('.rotor_textarea').keypress(function(e){
		let ch = e.key;
		if(ch == 'Enter'){
		    var current = parseInt($(this).val());
		    let id =parseInt($(e.target).attr('id'));
		    let data = {'id' : id, 'value' : current}
			$.ajax({
			  type : 'POST',
			  url : "/editrotor",
			  contentType: 'application/json',
			  data : JSON.stringify(data)
			})
			.done(updateRotorInfo);		    
			}

	});

	$('.scramble').click(function(e){
		$.ajax({
			  type : 'GET',
			  url : "/scramble",
			  contentType: 'application/json',
			})
			.done(updateRotorInfo);		
	})

	$('.edit').click(function(e){
		$('.edit').hide();
		$('.save').show();
		$('.message').show();
		$('.plug').attr('contenteditable','true');
		$('.plug').css("background-color",'white');
		$('.plug').css("color","black");
		$('.plug')[0].focus();
	})

	$('.save').click(function(e){
		$('.edit').show();
		$('.save').hide();
		$('.message').hide();
		let $plugs = $('.plug');
		let conns = new Array();
		for(var i=0;i<10;i++){
			e1 = $plugs[i].innerText;
			e2 = $plugs[i+10].innerText;
			// console.log(e1,e2);
			conns.push([e1.toLowerCase(),e2.toLowerCase()]);
		}	
		data = {"plugconns" : conns};
		$.ajax({
			  type : 'POST',
			  url : "/editplugs",
			  contentType: 'application/json',
			  data : JSON.stringify(data)
			})
			.done(updateRotorInfo);
	})


	function updateRotorInfo(res){
		res = JSON.parse(res);
		let rotor = JSON.parse(res['data']);
		let plugconns = rotor['plugconns'];
		showRotorInfo(rotor, res);
		showPlugsInfo(plugconns);
	}

	function showPlugsInfo(plugconns){
		st = 'abcdefghijklmnopqrstuvwxyz';
		plugconns = JSON.parse(plugconns);
		let $plug_div = $('.plug_div');
		let $plug_row1 = $('.plug_row.row1');
		let $plug_row2 = $('.plug_row.row2');
		$plug_row1.empty();
		$plug_row2.empty();
		plugconns.forEach(function(item){
			p1 = st[item[0]].toUpperCase();
			p2 = st[item[1]].toUpperCase();
			plug1 = $(`<div class="plug" id="${p1}">${p1}</div>`);
			plug2 = $(`<div class="plug" id="${p2}">${p2}</div>`);
			var randomColor = '#'+ ('000000' + Math.floor(Math.random()*16777215).toString(16)).slice(-6);
			while(randomColor == '#000000')
				randomColor = '#'+ ('000000' + Math.floor(Math.random()*16777215).toString(16)).slice(-6);
			plug1.css("background-color",randomColor);
			plug2.css("background-color",randomColor);
			$plug_row1.append(plug1);
			$plug_row2.append(plug2);
		});
	}

	function showRotorInfo(rotor, res){
		if( res['ch']!= undefined){
			let ch = res['ch'];
			$('.headertext span').append(ch);
		}
		$('.r1 span').text(`Rotor ${rotor['r1'][0]}`);
		$('.r1 span').attr('id', rotor['r1'][0]);
		$('.r2 span').text(`Rotor ${rotor['r2'][0]}`);
		$('.r2 span').attr('id',  rotor['r2'][0]);
		$('.r3 span').text(`Rotor ${rotor['r3'][0]}`);
		$('.r3 span').attr('id', rotor['r3'][0]);
		$('.r1 input').val(`${rotor['r1'][1]}`);
		$('.r1 input').attr('id', rotor['r1'][0]);
		$('.r2 input').val(` ${rotor['r2'][1]}`);
		$('.r2 input').attr('id', rotor['r2'][0]);
		$('.r3 input').val(`${rotor['r3'][1]}`);
		$('.r3 input').attr('id', rotor['r3'][0]);
	}

	function isAlphaOrParen(str) {
	  return /^[a-z]+$/.test(str);
	}
});