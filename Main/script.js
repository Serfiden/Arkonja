let user;
document.cookie = "username=" + user;
user = document.cookie;

let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function editProfile(arg){
	$(arg).parent().children('p').text('buna');
}

$(document).ready(function(){

	var optForEdit = '<i class="fa fa-pencil fa-2x editProfileDetails" aria-hidden="true" onclick = "editProfile(this)"></i>';
	var orgHtml = "";
	var postTemplate = $('#test').html();
	refreshFeed(postTemplate);
	$.get('/sessionbro', function(data){
		user = JSON.stringify(data);
		var str = user.split("\"");
		user = str[1];
	});
	$('#clearFeed').click(function(){
		$.get('/clearNewsFeed', function(data){
			console.log('sal');
			location.reload();
			return;
		});
	});

	$('li').click(function(){
		console.log(3);
	})

	$('#cog').mouseenter(function(){
		$(this).css('cursor', 'pointer');
		$(this).addClass('fa-spin');
	});
	$('#cog').mouseleave(function(){
		$(this).css('cursor', 'auto');
		$(this).removeClass('fa-spin');
	});
	$('#profileDetails').children('li').mouseenter(function(){
		orgHtml = $(this).html();
		$(this).add(optForEdit).appendTo(this);
		$(this).children('.editProfileDetails').css('cursor', 'pointer');
	});
	$('#profileDetails').children('li').mouseleave(function(){
		$(this).html(orgHtml);
		$(this).children('.editProfileDetails').css('cursor', 'auto');
	});
	$('i').click(function(){
		if($(this).hasClass('.editProfileDetails') == true)
			$(this).parent().children('p').text('sal');
	});
});