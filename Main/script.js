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
			$(feed).add("<div class = 'posts w3-cyan'><p>" + posts[5] + " wrote: " + decodeText(separateChars(posts[18])) + 
				" at " + posts[9] + "</p></div>").appendTo(feed);
			else
			$(feed).add("<div class = 'posts w3-cyan'><p>" + posts[18 * i + 5] + " wrote: " + decodeText(separateChars(posts[i * 18 + 18])) + 
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

$('#clearFeed').click(function(){
	$.get('/clearNewsFeed', function(data){
		console.log('sal');
		location.reload();
		return;
	});
});

$(document).ready(function(){
	$.get('/sessionbro', function(data){
		user = JSON.stringify(data);
		var str = user.split("\"");
		user = str[1];
	});
	refreshFeed('/loadNewsFeed', '#newsFeedContainer');
});