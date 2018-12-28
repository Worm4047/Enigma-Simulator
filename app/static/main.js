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
		console.log(id, ids);
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
		    console.log(current, id);
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
		console.log(plugconns.length);
		let $table = $('.connection_table');
		plugconns.forEach(function(item){

			p1 = st[item[0]];
			p2 = st[item[1]];
			e1 = $(`.plug#${p1}`);
			e2 = $(`.plug#${p2}`);
			// e1.addClass('active');
			// e2.addClass('active');
			let $row = $('<tr></tr>');
			let $col1 = $('<td></td>');
			let $col2 = $('<td></td>');
			$col1.text(p1);
			$col2.text(p2);
			$row.append($col1);
			$row.append($col2);
			$table.append($row);
			var randomColor = '#'+ ('000000' + Math.floor(Math.random()*16777215).toString(16)).slice(-6);
			while(randomColor == '#000000')
				randomColor = '#'+ ('000000' + Math.floor(Math.random()*16777215).toString(16)).slice(-6);
			e1.css("background-color",randomColor);
			e2.css("background-color",randomColor);
			console.log(p1,p2, randomColor);
			// h1 = e1.height();
			// w1 = e1.width();
			// h2 = e2.height();
			// w2 = e2.width();
			// pos1 = e1.position();
			// pos2 = e2.position();
			// l1=pos1.left;
			// l2=pos2.left;
			// t1=pos1.top;
			// t2=pos2.top;
			// p1 = {'x': l1+w1/2, 'y': t1+h1/2};
			// p2 = {'x': l2+w2/2, 'y': t2+h2/2};
			// console.log(p1,p2);
			// $('.plugscontainer').append(`<svg width="500" height="500"><line x1="${p1['x']}" y1="${p1['y']}" x2="${p2['x']}" y2="${p2['y']}" stroke="white"/></svg>`);
			// return;
		})
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