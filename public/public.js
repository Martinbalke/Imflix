
'use strict';

//When the nav button is selected shows the nav menu
$('.nav__checkbox').change( (e) => {
	$('.nav__background').toggle(400);
	$('.nav__list').toggle(400);
});

//When the favorites button is pressed this code posts an ajax request to favorites
//then it fades a success confirmation for the user
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



