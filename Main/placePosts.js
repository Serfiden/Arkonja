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
			console.log(newDiv);


			if(i != 0)	
				$('#newPostContainer + .posts').before($(newDiv));
			else 
				$('#newsFeedContainer').add(newDiv).appendTo('#newsFeedContainer'); 
		}
		document.getElementById('inputBox').value = '';
	});


	$('#likeButton').click(function(){
		var likes = $('#likesNum').text();
		 
	});
});