var clickEv = !Modernizr.touch ? 'click' : 'touchstart';

$(document).ready(function() {

	if (!Modernizr.svg) {
  		$('.logo img').attr('src', './images/logo.png');
	}

	// Paging
	// $('.testimonials').on('scroll', function() {
	// 	var tWidth = $(this).width();
	// 	var offset = $(this).scrollLeft();
	// 	var idx = Math.round(offset / tWidth);		
	// 	$('.testimonials__pages li').removeClass('current').eq(idx).addClass('current');
	// });

	(function($) {

		if(!Modernizr.matchmedia) return;

		var tscroller = null;
		var mql = window.matchMedia('screen and (max-width: 799px)');

		function setupScroller(q) {
			var $t = $('.testimonial');

			if (q.matches) {

				var ww = $(window).width();
				var maxHeight = -1;

				$t.each(function() {
					// $(this).css({ width: ww });
					maxHeight = maxHeight > $(this).height() ? maxHeight : $(this).height();
				});

				$('.testimonials').height(maxHeight);
				// $('.testimonials__scroller').width($t.length * ww);

				tscroller = new IScroll('.testimonials', {
					scrollX: true,
					scrollY: false,
					snap: 'article',
					// mouseWheel: true,
					eventPassthrough: true
				});
				tscroller.on('scrollEnd', function() {
					var that = this;
					$('.testimonials__pages li').removeClass('current').eq(that.currentPage.pageX).addClass('current');
				});
			}
			else {
				if(tscroller) tscroller.destroy();
				tscroller = null;

				setTimeout(function() {
					$('.testimonials').height('auto');
					// $('.testimonials__scroller').width('auto');
					// $t.css({ width: '33.33%' });
				},100);				
			}
		}

		setupScroller(mql);
		mql.addListener(setupScroller);

	})(jQuery);
	

	// Modals.
	// var pageY = 0;
	$('.testimonial-detail').on(clickEv, function(e) {
		e.preventDefault();
		var content = $(this).prev('blockquote').html();
		$('.modal__content').html(content);

		$('body').addClass('modal-active');
	});

	$('.modal-close').on(clickEv, function(e) {
		e.preventDefault();

		$('body').removeClass('modal-active');
	});

});