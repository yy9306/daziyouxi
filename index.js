$(function() {
	var start = $('#start');
	var scores=0;
	var shengmingzhi=100;
	var clientH = $(document).height();
	var timer1,timer2;
	var guan=1;
	var speed=200;
	var arr = {
		a: '<img src = "images/A_Z/A.png" alt="">' ,
		b: '<img src = "images/A_Z/B.png" alt="">' ,
		c: '<img src = "images/A_Z/C.png" alt="">' ,
		d: '<img src = "images/A_Z/D.png" alt="">' ,
		e: '<img src = "images/A_Z/E.png" alt="">' ,
		f: '<img src = "images/A_Z/F.png" alt="">' ,
		g: '<img src = "images/A_Z/G.png" alt="">' ,
		h: '<img src = "images/A_Z/H.png" alt="">' ,
		i: '<img src = "images/A_Z/I.png" alt="">' ,
		j: '<img src = "images/A_Z/J.png" alt="">' ,
		k: '<img src = "images/A_Z/K.png" alt="">' ,
		l: '<img src = "images/A_Z/L.png" alt="">' ,
		m: '<img src = "images/A_Z/M.png" alt="">' ,
		n: '<img src = "images/A_Z/N.png" alt="">' ,
		o: '<img src = "images/A_Z/O.png" alt="">' ,
		p: '<img src = "images/A_Z/P.png" alt="">' ,
		q: '<img src = "images/A_Z/Q.png" alt="">' ,
		r: '<img src = "images/A_Z/R.png" alt="">' ,
		s: '<img src = "images/A_Z/S.png" alt="">' ,
		t: '<img src = "images/A_Z/T.png" alt="">' ,
		u: '<img src = "images/A_Z/U.png" alt="">' ,
		v: '<img src = "images/A_Z/V.png" alt="">' ,
		w: '<img src = "images/A_Z/W.png" alt="">' ,
		x: '<img src = "images/A_Z/X.png" alt="">' ,
		y: '<img src = "images/A_Z/Y.png" alt="">' ,
		z: '<img src = "images/A_Z/Z.png" alt="">' ,
	}
	var createZimu = function() {
		for (var i = 0; i < guan; i++) {
			var zimu=String.fromCharCode(Math.floor(Math.random()*26+97));
			$('<div>').addClass('style '+zimu).html(arr[zimu]).appendTo($('#anim')).css({left:Math.random()*($('#anim').width()-$('.style').width())});
		};
	}
	var di=clientH-150;
	function diao(){
		$('.style').animate({top:'+=10'},100);
		$.each($('.style'),function(i,v){
			if (parseInt($(v).css('top'))>=di){
				$(v).remove();
				shengmingzhi=shengmingzhi-2;
				$('#Jfen .right>span').text(shengmingzhi);
				if (shengmingzhi<=0) {
					$('.style').remove();
					clearInterval(timer1)
					clearInterval(timer2)
					guan=1;
					speed=200;
					kaishi($('#restart'));
				};
			};
		})
	}
	$('#popup').height(clientH - 128);
	$('#anim').height(clientH - 128);
	$('#Jfen').css({top:clientH - 128});
	$('#top_yun').animate({left:'+=100'},1000,function(){
		$(this).animate({left:'-=200'},2000).animate({left:'+=200'},2000,arguments.callee)
	})
	var kaishi=function(butt){
		butt.animate({
			top: -300
		}, 1000).animate({
			top: -350
		}, 500).animate({
			top: -321
		}, 500);
	}
	kaishi(start)
	$('#popup').on('click','.start_bu', function() {
		$(this).css({opacity: 0});
		$('.start_top span').empty().addClass('cba').append($('<img src="images/123.gif " alt="" />')).delay(3000).queue(function() {
			$('#start').animate({top: -300}, 500).animate({top: -760}, 1000).dequeue();
				timer1=setInterval(createZimu,1000);
				timer2=setInterval(diao,speed);				
		})
	})
	$('#popup').on('click','.victory_bu',function(){
		guan=guan+1;
		speed=speed-guan*20;
		$(this).parent().animate({top: -300}, 500).animate({top: -760}, 1000);
		timer1=setInterval(createZimu,1000);
		timer2=setInterval(diao,speed);
	})
	$('#popup').on('click','.restart_bu',function(){
		scores=0;
		shengmingzhi=100;
		$('#Jfen .right>span').text(shengmingzhi);
		$('#Jfen .left>span').text(scores);
		$(this).parent().animate({top: -300}, 500).animate({top: -760}, 1000);
		timer1=setInterval(createZimu,1000);
		timer2=setInterval(diao,speed);
	})
	$(document).on('keyup',function(e){	
		var key=String.fromCharCode(e.keyCode).toLowerCase();
		scores=($('.'+key).length)+scores;
		$('#Jfen .left span').text(scores);
		$('.'+key).remove();
		if(scores>=guan*30){
			$('.style').remove();
			clearInterval(timer1);
			clearInterval(timer2);
			kaishi($('#victory'))
		}
	})
})