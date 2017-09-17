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

			if(i != 0)	
				$('#newPostContainer + .posts').before($('<div class= "posts w3-cyan" ><p>' + user + ' wrote: ' + postText + ' at ' + date + '</p></div>'));
			else 
				$('#newsFeedContainer').add("<div class = 'posts w3-cyan'><p>" + user + " wrote: " + postText + 
				" at " + date + "</p></div>").appendTo('#newsFeedContainer'); 
		}
		document.getElementById('inputBox').value = '';
	});