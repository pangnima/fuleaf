$(function () {

	/* 타이핑 */
	$('.typer').on('click' , function(){
		$('.search-hidden').hide();
		$('.search-input').css({display: 'flex'});
		$('.btn-link').css({display: 'inline-block'});
		$('.search-input input').focus();
		isTying = false
	})

	

	/* 검색 */
	$('.search-input input').on('keydown', function(e){
		var value = $('.search-input input').val();
		$('body').append('<div id="virtual_dom">' + value + '</div>'); 
		var inputWidth =  $('#virtual_dom').width() + 20; // 글자 하나의 대략적인 크기 
		$('.search-input input').css('width', inputWidth); 
		$('#virtual_dom').remove();
	});

	var fullPageCreated = false;
	function createFullpage() {
		if(fullPageCreated === false){
			fullPageCreated = true;
			$('#fullpage').fullpage({
				anchors:['search', 'filter' ,'magazine-1','magazine-2','info'],
				navigation: true,
				navigationTooltips:["홈","필터","매거진","매거진-하","플립은"],
				navigationPosition: 'left',
				scrollBar : true,
				fitToSection: false,
				Parallax :true,
				autoScrolling:true,
				verticalCentered:true,
				responsiveHeight: 330,
				responsiveSlides: true
			});
		}
	}
	createFullpage();
	var isVisible = false;

	$(window).on('mousewheel DOMMouseScroll touchstart' , function(e){
		console.log("DF")
		/* 덮어지는 액션 */
		var scrollT =$(window).scrollTop()
		if(scrollT > 5316){
			$.fn.fullpage.setMouseWheelScrolling(false);
			if (e.originalEvent.wheelDelta < 0) {
				// scroll down 
				$('.scroll-page').stop().animate({
					top: '-=75px'
				}, 500 );
			} else {
				//scroll up 
				$('.scroll-page').stop().animate({
					top: '+=75px'
				}, 500 );
			}
		} else{
			$.fn.fullpage.setMouseWheelScrolling(true);
			$('.scroll-page').css({
				top:'0px'
			})
		}

		/*  로고액션 */
		if (checkVisible($('.logo-action'))&&!isVisible) {
			// alert("Visible!!!");
			for(let i=0, len=300; i<len; i++ ){
				setTimeout(function(){
					$('.imgAction').attr('src',`../images/logo/logo_${i}.png`)
				},20*i)
			}
			isVisible=true;
		}

		/*  원페이지 네비게이션 위치 */
		if($('#fp-nav ul li:nth-child(4)').children().hasClass('active')){
			$('#fp-nav ul li:nth-child(3)').children().addClass('active')
		}

		// 
		// if(scrollT > $('.essence').offset().top - 1200){
		// 	$('.essence-list li').addClass('aos-animate')
		// }
		/* 로고액션 */
		if(scrollT > $('#trigger').offset().top - 1200){
			$('.action-box').addClass('active');
		} else {
			$('.action-box').removeClass('active');
		}


	})

	/*  로고액션 */
	function checkVisible( elm, eval ) {
		eval = eval || "object visible";
		var viewportHeight = $(window).height(), // Viewport Height
			scrolltop = $(window).scrollTop(), // Scroll Top
			y = $(elm).offset().top,
			elementHeight = $(elm).height();   
		
		if (eval == "object visible") return ((y < (viewportHeight + scrolltop)) && (y > (scrolltop - elementHeight)));
		if (eval == "above") return ((y < (viewportHeight + scrolltop)));
	}
	

	

	// var stack = 0;
	// $(window).on('mousewheel', function(e){
	// 	var isLast = $('.docSlider-page_3').length;
	// 	var h = $(".aa").height;
	// 	var ht = $(".aa").css('top').split('px')[0]
		
	// 	if (e.originalEvent.wheelDelta < 0) {
	// 		// scroll down 
	// 		console.log(stack)
	// 		stack+=1
	// 		if(isLast){
	// 			if( Number(ht) > 0  ){
	// 				if (stack < 100){
	// 					$(".aa").css({"transform" : 'translateY(-' + stack +'%)'});
	// 				} else {
	// 					console.log('그만')
	// 				}
	// 			}
	// 		}
	// 	} else {
	// 		//scroll up 
	// 		console.log(stack)
	// 		stack-=1
	// 		if(isLast){
	// 			if( Number(ht) < 0  ){
	// 				$(".aa").css({"transform" : 'translateY(-' + stack +'%)'});
					
	// 			}
	// 		}
	// 	}
	// })
	

	// $(".aa").css({
	// 	"transform" : "translate3d(0px, " + st  + "%, .01px)",
	// 	"-webkit-transform" : "translate3d(0px, " + st  + "%, .01px)"
	// });

	// $(window).resize(function(){
	// 	console.log( $('.full-page-wrap').height() *$('.full-page-wrap').length )
	// })

})
