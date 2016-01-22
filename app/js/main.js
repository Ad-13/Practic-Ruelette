$(function () {
	console.log('Hi!111');
// MOVE TO
$(document).ready(function(){
	$("#to-up").click(function (event) {
		event.preventDefault();
		$('body,html').animate({scrollTop: 0}, 1500);
	});
});
// END MOVE TO

	$('#slider-1').owlCarousel({
		autoplay: true,
		loop: true,
		margin:10,
		nav:true,
		navText:false,
		responsive:{
				0:{
						items:1
				},
				600:{
						items:3
				},
				1000:{
						items:5
				}
		}
	});

});


