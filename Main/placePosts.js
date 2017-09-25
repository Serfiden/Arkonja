function moarLikes(elem){
	var str = $(elem).parent().children(".likesNum").text();
	var likes = str.slice(12, str.length);
	var dataId = $(elem).parent().children('#dateContainer').text();
	if($(elem).children('p').text() == 'Like'){
		likes ++;
		var final = "Post score: " + likes;
		$(elem).parent().children('#postScore').css('display', 'inline');
		$(elem).parent().children('.likesNum').empty();
		$(elem).parent().children('.likesNum').append('' + final);
		$(elem).children('p').text('Dislike');
		$(elem).children('i').removeClass('fa fa-thumbs-up');
		$(elem).children('i').addClass('fa fa-thumbs-down');
		$(elem).css('width', '100');
		$.get('/increaseLikesNum/' + dataId, function(data){
		});
	}
	else {
		likes --;
		var final = "Post score: " + likes;
		if(likes == 0)
			$(elem).parent().children("#postScore").css('display', 'none');
		$(elem).parent().children('.likesNum').empty();
		$(elem).parent().children('.likesNum').append('' + final);
		$(elem).children('i').removeClass('fa fa-thumbs-down');
		$(elem).children('i').addClass('fa fa-thumbs-up');
		$(elem).children('p').text('Like');
		$(elem).css('width', '80');
		$.get('/decreaseLikesNum/' + dataId, function(data){
		});
	}
	
}

$(document).ready(function(){
	var postTemplate = $('#test').html();

	$('#postBtn').click(function(){
		var d = new Date();

		var newHour = d.getHours();
		var newMins = d.getMinutes();
		var newSecs = d.getSeconds();
		if(d.getHours() < 10) newHour = "0" + d.getHours();
		if(d.getMinutes() < 10) newMins = "0" + d.getMinutes();
		if(d.getSeconds() < 10) newSecs = "0" + d.getSeconds();

		var date = "" + months[d.getMonth()] + " " + d.getDate() + " " + d.getFullYear() + ", " + newHour + ":" + newMins + ":" + newSecs;
		var postText = document.getElementById('inputBox').value;
		if(postText != '')
		{
			var postData = {};
			postData.postingDate = date;
			postData.username = user;
			postData.message = postText;

			$.post('/newPost', postData, function(data){

			}, 'json');

			var i = countDivs('.posts');

			var newDiv = postTemplate.replace("usernamePlaceholder", user).replace("textPlaceholder", postText).replace("datePlaceholder", date);
			newDiv = "<div class = 'posts w3-light-blue'>" + newDiv;
			newDiv = newDiv + "</div>"; 	

			if(i != 0)	
				$('#newPostContainer + .posts').before($(newDiv));
			else 
				$('#newsFeedContainer').add(newDiv).appendTo('#newsFeedContainer'); 
		}
		document.getElementById('inputBox').value = '';
	});

});