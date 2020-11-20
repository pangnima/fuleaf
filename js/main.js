$(function () {

	/* 타이핑 및 검색 */
	$('.typer').on('keyup' , function(){
		var isVal = $(this).val().length;
		console.log(isVal)
		if(isVal>0){
			$('.search-del-text').hide();
		} else {
			$('.search-del-text').show();
		}
		// $('.search-hidden').css({display:'none'})
		$('.btn-link').css({display: 'inline-block'});
		textWidth();
	})

	/* 타영역 클릭시 되돌리기 */
	$(document).on('click' , function(e){
		e.stopPropagation();
		if(!$(e.target).hasClass("typer") && !$(e.target).hasClass("btn-link")){ 
			$('.search-del-text').css({display:'inline-block'})
			$('.btn-link').css({display: 'none'});
			$('.typer').val("")
		}
	})

	/* 텍스트길이 조정 */
	var textWidth = function(e){
		var value = $('.typer').val();
		$('body').append('<div id="virtual_dom">' + value + '</div>'); 
		var inputWidth =  $('#virtual_dom').width() + 20; // 글자 하나의 대략적인 크기 
		$('.typer').css('width', inputWidth); 
		$('#virtual_dom').remove();
	}

	
	var mySwiper = new Swiper('.swiper-container', {
		// loop: true,
		// slidesPerView: 'auto',
		// width:214,
		spaceBetween: 42,
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
				slidesPerView: 'auto',
				spaceBetween: 42
			}
		}
	})
	var visionSlide = new Swiper('.vision-slide', {
		// loop:true,
		slidesPerView: 5,
		spaceBetween: 33,
	})

	var filterSlide = new Swiper('.depth-slide', {
		slidesPerView: 'auto',
		speed: 2000,
		autoHeight:true,
		noSwipingClass:'depth-slide'
	})

	/* 필터 */
	const filters = [
		{
		id: "5fabb88461f93bdd9b20e0d9",
		name: "잎이 있는 식물",
		secondFilters: [
			{
			id: "5fabcee867917feda4fa2010",
			name: "잎 모양",
			thirdFilters: [
				{ id: "5fabd07267917feda4fa201a", name: "구멍" },
				{ id: "5fabd07567917feda4fa201b", name: "넓은" },
				{ id: "5fabd07967917feda4fa201c", name: "뾰족한" },
				{ id: "5fabd07c67917feda4fa201d", name: "갈라진" },
				{ id: "5fabd08167917feda4fa201e", name: "별모양" },
				{ id: "5fabd08467917feda4fa201f", name: "하트모양" },
				{ id: "5fabd08867917feda4fa2020", name: "얇은" },
				{ id: "5fabd08c67917feda4fa2021", name: "둥근" },
				{ id: "5fabd08f67917feda4fa2022", name: "작은" },
				{ id: "5fabd09267917feda4fa2023", name: "무늬" },
			],
			},
			{ id: "5fabceeb67917feda4fa2011", name: "공기정화", thirdFilters: [] },
			{
			id: "5fabcef467917feda4fa2012",
			name: "반려동물 안전한",
			thirdFilters: [],
			},
			{ id: "5fabcf1667917feda4fa2013", name: "향기 나는", thirdFilters: [] },
			{ id: "5fabcf1a67917feda4fa2014", name: "열매 맺는", thirdFilters: [] },
			{
			id: "5fabcf2067917feda4fa2015",
			name: "빛이 적어도 되는",
			thirdFilters: [],
			},
			{ id: "5fabcf2667917feda4fa2016", name: "꽃 피는", thirdFilters: [] },
		],
		},
		{ id: "5fabbe87205e2ce27a38dd86", name: "공중식물", secondFilters: [] },
		{ id: "5fabbe91205e2ce27a38dd87", name: "넝쿨식물", secondFilters: [] },
		{
		id: "5fabbe9c205e2ce27a38dd88",
		name: "선인장/다육식물",
		secondFilters: [],
		},
	];

	filters.forEach(function(val){
		$('.depth-1 .filter-item-box').append(`<li class="filter-item">${val.name}</li>`)
	})
	
	var onedepIdx = 0;
	var twodepIdx = 0;
	$('.depth-1 .filter-item').on('click' , function(){
		var selectText = $(this).html()
		var idx = $(this).index();
		var list = filters[idx].secondFilters.length;
		onedepIdx = $(this).index();

		
		if(list){
			$('.depth-2 .filter-item-box').empty()
			$('.depth-2 .filter-item-box').append(`<li class="btn-prev">이전</li>`)
			filters[idx].secondFilters.forEach( function(val){ 
				$('.depth-2 .filter-item-box').append(`<li class="filter-item">${val.name}</li>`)
			})
			$(`<li class="btn-search"><button type="button">검색</button></li>`).appendTo('.depth-2 .filter-item-box')

			setTimeout(function(){
				filterSlide.slideNext();
				$('.select-text').addClass('active');
				$('.select-text span').html(selectText)
			},500)
		}
		$(this).addClass('active');
	})

	
	$(document).on('click', '.depth-2 .filter-item' , function(){
		var selectText = $(this).html()
		var idx = $(this).index() - 1;
		var list = filters[onedepIdx].secondFilters[idx].thirdFilters.length;
		if(list){
			$('.depth-3 .filter-item-box').empty()
			$('.depth-3 .filter-item-box').append(`<li class="btn-prev">이전</li>`)
			filters[onedepIdx].secondFilters[idx].thirdFilters.forEach(function(val){
				$('.depth-3 .filter-item-box').append(`<li class="filter-item">${val.name}</li>`)
			})
			if($('.btn-search').length === 0){
				$(`<li class="btn-search"><button type="button">검색</button></li>`).appendTo('.depth-2 .filter-item-box')
			}
			
			setTimeout(function(){
				filterSlide.slideNext()
			},500)
		}
		$(this).addClass('active');
		$('.btn-search').addClass('isvisible');
	})

	var checkLen = 
	$(document).on('click', '.depth-3 .filter-item' , function(){
		$(this).toggleClass('active');
		checkLen = $('.depth-3 .filter-item.active').length;
	})

	$(document).on('click' , '.btn-prev' , function(){
		filterSlide.slidePrev()
	})

	// 덮어지는 액션
	// var overpage = function(e){
	// 	if (e.originalEvent.wheelDelta < 0) {
	// 		$.fn.fullpage.setMouseWheelScrolling(false);
	// 		$.fn.fullpage.setKeyboardScrolling(false);
	// 		$('body','html').css({overflow:'visible'})
	// 		// 덮어지는 높이 측정
	// 		var overPagePos = Math.abs($('.scroll-page').css('top').split('px')[0])
	// 		var overPageHeight = $('.scroll-page').height()
	// 		if( overPagePos < overPageHeight-200 ){
	// 			$('.scroll-page').stop().animate({
	// 				top: '-=200px'
	// 			}, 250 ,"linear" );
	// 		}
	// 		var subTitleoffsetTop = $('[data-aos]');
	// 		var st = $('.scroll-page').css('top').split('px')[0]
	// 		var absSt = Math.abs(st);
	// 		subTitleoffsetTop.each(function(index, item){
	// 			if( item.offsetTop < absSt-300 ){
	// 				$(this).addClass('aos-animate')
	// 			}
	// 		})
	// 		$('#fp-nav').fadeOut('fast')
	// 	}else {
	// 		var topPos = $('.scroll-page').css('top').split('px')[0]
	// 		// console.log( topPos >= 0)
	// 		$('body','html').css({overflow:'hidden'})
	// 		$('.scroll-page').stop().animate({
	// 			top: '+=200'
	// 		}, 250 , "linear" );
	// 		if( topPos >= 0){
	// 			$.fn.fullpage.setMouseWheelScrolling(true)
	// 			$.fn.fullpage.setKeyboardScrolling(true);
	// 			$('.scroll-page').css({top:0})
	// 			$('#fp-nav').fadeIn('fast')
	// 		}
	// 	}
	// }


	$('#fullpage').fullpage({
		anchors:['search', 'filter' ,'magazine-1','magazine-2','info'],
		navigation: true,
		navigationTooltips:["식물검색","식물찾기","매거진","매거진-하","플립"],
		navigationPosition: 'left',
		responsiveHeight: 330,
		sectionSelector:'.full-page-wrap',
		scrolbar:true,

		afterLoad: function(anchorLink, index){
			$('.full-page-wrap.active [data-aos]').addClass("aos-animate");
			// console.log($(window).scrollTop())
			
			if(index === $('#fullpage .full-page-wrap').length){
				$(this).on('mousewheel DOMMouseScroll', function(e){

					var scrollT =$(window).scrollTop()
					if (e.originalEvent.wheelDelta > 0) {
						// 올림
						console.log('올림')
						$.fn.fullpage.setMouseWheelScrolling(true)
						$.fn.fullpage.setKeyboardScrolling(true);
						$('html, body').css({overflow:'hidden'})
						$('#fullpage').css({position:'relative'})
						
					}else{
						// 내림
						console.log('내림')
						$.fn.fullpage.setMouseWheelScrolling(false);
						$.fn.fullpage.setKeyboardScrolling(false);
						$('#fullpage').css({position:'fixed'})
						$('html, body').css({overflow:'visible'})
					}
				})

					
				// 터치
				let initialX = null, initialY = null;
				let target = document.querySelector('.wrap');

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
								$.fn.fullpage.setMouseWheelScrolling(false);
								$.fn.fullpage.setKeyboardScrolling(false);
								$('#fullpage').css({position:'fixed'})
								$('html, body').css({overflow:'visible'})
							} else{
								console.log("to bottom")
								$.fn.fullpage.setMouseWheelScrolling(true)
								$.fn.fullpage.setKeyboardScrolling(true);
								$('html, body').css({overflow:'hidden'})
								$('#fullpage').css({position:'relative'})
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


	var isVisible = false;
	$(window).on('mousewheel DOMMouseScroll touchstart' , function(e){
		var scrollT =$(window).scrollTop()

		var imgAction = function(ele){
			var tg = $(`.${ele}`).offset().top - 400;
			if(scrollT>tg){
				$(`.${ele}`).css({
					backgroundPositionY:-(scrollT-tg)/10+"px"
				})
			}
		}
		imgAction('believe-img');
		imgAction('mission-img-1');
		imgAction('mission-img-2');
		imgAction('mission-img-3');
		
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
		/* 로고액션 */
		if(scrollT > $('#trigger').offset().top - 500){
			$('.action-box').addClass('active');
		} else {
			$('.action-box').removeClass('active');
		}


		/*  원페이지 네비게이션 위치 */
		if($('#fp-nav ul li:nth-child(4)').children().hasClass('active')){
			$('#fp-nav ul li:nth-child(3)').children().addClass('active')
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
