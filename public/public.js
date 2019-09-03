
'use strict';


$('.nav__checkbox').change( (e) => {
	$('.nav__background').toggle(400);
	$('.nav__list').toggle(400);
});


$('#favorites-button').click( (e) => {
	e.preventDefault();
	$.ajax({
		url: '/favorites',
		type: 'post',
		data: {
			id:$('#favorites-button').val(),
		},
		success() {
			$('.imdb__success').fadeIn().delay(2000).fadeOut();
		}
	});
});


