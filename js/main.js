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

	
	var mySwiper = new Swiper('.swiper-container', {
		loop: true,
		slidesPerView: 5.5,
		spaceBetween: 30,
		breakpoints: {
			320: {
				slidesPerView: 1.5,
				spaceBetween: 10
			},
			760: {
				slidesPerView: 4,
				spaceBetween: 20
			},
			960: {
				slidesPerView: 5,
				spaceBetween: 20
			}
		}
	})
	var visionSlide = new Swiper('.vision-slide', {
		loop:true,
		slidesPerView: 5,
		spaceBetween: 33,
	})

	var filterSlide = new Swiper('.depth-slide', {
		slidesPerView: 'auto',
		noSwipingClass:'depth-slide'
	})

	$('.depth-1 ul li').on('click' , function(){
		var selectText = $(this).html()
		$('.select-text span').html(selectText)
		$('.select-text').addClass('active');
		setTimeout(function(){
			filterSlide.slideNext()
		},500)
	})
	$('.depth-2 ul li').on('click' ,function(){
		$(this).toggleClass('active');
		$(this).siblings('.btn-search').addClass('isvisible')
	})
	$('.depth-3 ul li').on('click' ,function(){
		$(this).toggleClass('active');
		$(this).siblings('.btn-search').addClass('isvisible')
	})
	$('.depth-2 .btn-search').on('click' ,function(){
		setTimeout(function(){
			filterSlide.slideNext()
		},150)
	})
	$('.btn-prev').on('click' , function(){
		filterSlide.slidePrev()
	})


	// 덮어지는 액션
	var overpage = function(e){
		if (e.originalEvent.wheelDelta < 0) {
			$.fn.fullpage.setMouseWheelScrolling(false);
			$.fn.fullpage.setKeyboardScrolling(false);
			$('body','html').css({overflow:'visible'})
			// 덮어지는 높이 측정
			var overPagePos = Math.abs($('.scroll-page').css('top').split('px')[0])
			var overPageHeight = $('.scroll-page').height()
			if( overPagePos < overPageHeight-200 ){
				$('.scroll-page').stop().animate({
					top: '-=200px'
				}, 250 ,"linear" );
			}
			var subTitleoffsetTop = $('[data-aos]');
			var st = $('.scroll-page').css('top').split('px')[0]
			var absSt = Math.abs(st);
			subTitleoffsetTop.each(function(index, item){
				if( item.offsetTop < absSt-300 ){
					$(this).addClass('aos-animate')
				}
			})
			$('#fp-nav').fadeOut('fast')
		}else {
			var topPos = $('.scroll-page').css('top').split('px')[0]
			// console.log( topPos >= 0)
			$('body','html').css({overflow:'hidden'})
			$('.scroll-page').stop().animate({
				top: '+=200'
			}, 250 , "linear" );
			if( topPos >= 0){
				$.fn.fullpage.setMouseWheelScrolling(true)
				$.fn.fullpage.setKeyboardScrolling(true);
				$('.scroll-page').css({top:0})
				$('#fp-nav').fadeIn('fast')
			}
		}
	}
	
	function createFullpage() {
		$('#fullpage').fullpage({
			anchors:['search', 'filter' ,'magazine-1','magazine-2','info'],
			navigation: true,
			navigationTooltips:["홈","필터","매거진","매거진-하","플립은"],
			navigationPosition: 'left',
			responsiveHeight: 330,
			responsiveSlides: true,
			onLeave: function(){
				$('.section [data-aos]').removeClass("aos-animate");
			},
			onSlideLeave: function(){
				$('.slide [data-aos]').removeClass("aos-animate");
			},
			afterSlideLoad: function(){
				$('.slide.active [data-aos]').addClass("aos-animate");
			},
			afterLoad: function(anchorLink, index){
				$('.section.active [data-aos]').addClass("aos-animate");
				if(index === $('#fullpage .section').length){
					// 휠
					$(this).on('mousewheel DOMMouseScroll', overpage)
					$('.scroll-page').on('mousewheel DOMMouseScroll', overpage)

					// 터치
					let initialX = null,
					initialY = null;

					function initTouch(e) {
						initialX = `${e.touches ? e.touches[0].clientX : e.clientX}`;
						initialY = `${e.touches ? e.touches[0].clientY : e.clientY}`;
					};

					function swipeDirection(e) {
						if (initialX !== null && initialY !== null) {
							const currentX = `${e.touches ? e.touches[0].clientX : e.clientX}`,
							currentY = `${e.touches ? e.touches[0].clientY : e.clientY}`;

							let diffX = initialX - currentX,
							diffY = initialY - currentY;

							if(Math.abs(diffX) > Math.abs(diffY)){
								if(0 < diffX){
									console.log("to left")	
								} else{
									console.log("to right")	
								}
							} else{
								if(0 < diffY){
									console.log("to top")
									$('body','html').css({overflow:'visible'})

									// 덮어지는 높이 측정
									var overPagePos = Math.abs($('.scroll-page').css('top').split('px')[0])
									var overPageHeight = $('.scroll-page').height()
									if( overPagePos < overPageHeight-200 ){
										$('.scroll-page').stop().animate({
											top: '-=200px'
										}, 250 ,"linear" );
									}
									var subTitleoffsetTop = $('[data-aos]');
									var st = $('.scroll-page').css('top').split('px')[0]
									var absSt = Math.abs(st)
									subTitleoffsetTop.each(function(index, item){
										if( item.offsetTop < absSt-300 ){
											$(this).addClass('aos-animate')
										}
									})
									$('#fp-nav').fadeOut('fast')

								} else{
									var topPos = $('.scroll-page').css('top').split('px')[0]
									$('body','html').css({overflow:'hidden'})
									$('.scroll-page').stop().animate({
										top: '+=200'
									}, 250 , "linear" );
									console.log()
									if( topPos >= 0){
										$.fn.fullpage.setMouseWheelScrolling(true)
										$.fn.fullpage.setKeyboardScrolling(true);
										$.fn.fullpage.setAllowScrolling(true)
										$('.scroll-page').css({top:0})
										$('#fp-nav').fadeIn('fast')
									} else {
										$.fn.fullpage.setAllowScrolling(false)
										$.fn.fullpage.setMouseWheelScrolling(false);
										$.fn.fullpage.setKeyboardScrolling(false);
									}
								}
							}
							initialX = null;
							initialY = null;
						}
					}

					window.addEventListener("touchstart", initTouch);
					window.addEventListener("touchmove", swipeDirection);

				}
			}
		});
	}
	createFullpage();
	var isVisible = false;
	$(window).on('mousewheel DOMMouseScroll touchstart' , function(e){
		var scrollT =$(window).scrollTop()
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

		/* 로고액션 */
		if(scrollT > $('#trigger').offset().top - 500){
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
})
