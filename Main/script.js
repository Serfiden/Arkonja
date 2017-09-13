/*
	- apparently there is an error for the username retrieval during login
	- look into the untested idea, perhaps there might be an easier way to add a div between
	two specific div without having to query the database and re-store a huge chunk of data
*/

var user;
document.cookie = "username=" + user;
user = document.cookie;

var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function decodeText(array){
	var txt = "";
	for(var i = 0; i < array.length; i ++)
	{
		txt += String.fromCharCode(array[i]);
	}
	return txt;
};

function separateChars(arg){
	var txt = arg.split("}");
	var newArgs = txt[0];
	var tempString = "";
	for(var i = 2; i < newArgs.length - 1; i ++)
	{
		tempString += newArgs[i];
	}
	var finalArgs = tempString.split(",");
	return finalArgs;
}

function refreshFeed(reqName, feed){
	$.get(reqName, function(data){
		var str = JSON.stringify(data);
		var posts = str.split("\"");
		console.log(posts);
		for(var i = 0; i < (posts.length / 19); i ++)
		{
			if(i == 0)
			$(feed).add("<div class = 'posts'><p>" + posts[5] + " wrote: " + decodeText(separateChars(posts[18])) + 
				" at " + posts[9] + "</p></div>").appendTo(feed);
			else
			$(feed).add("<div class = 'posts'><p>" + posts[18 * i + 5] + " wrote: " + decodeText(separateChars(posts[i * 18 + 18])) + 
				" at " + posts[i * 18 + 9] + "</p></div>").appendTo(feed); 
		}
	});
}

function countDivs(identifier)
{
	var i = 0;
	$(identifier).each(function(index){
		i ++;
	});
	return i;
}

$(document).ready(function(){
	$.get('/sessionbro', function(data){
		user = JSON.stringify(data);
		var str = user.split("\"");
		user = str[1];
	});
	refreshFeed('/loadNewsFeed', '#newsFeedContainer');

	// refreshFeed(0);
	
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
				$('#placePost + .posts').before($('<div class= "posts" ><p>' + user + ' wrote: ' + postText + ' at ' + date + '</p></div>'));
			else 
				$('#newsFeedContainer').add("<div class = 'posts'><p>" + user + " wrote: " + postText + 
				" at " + date + "</p></div>").appendTo('#newsFeedContainer'); 
		}
		document.getElementById('inputBox').value = '';
	});
	



});