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
};

function refreshFeed(template){
	$.get('/loadNewsFeed', function(data){
		var str = JSON.stringify(data);
		var posts = str.split("\"");		
		for(var i = 0; i < (posts.length / 19); i ++){
				var txt = decodeText(separateChars(posts[20 * i + 18]));
				var date = posts[20 * i + 9];
				var newDiv = template.replace("usernamePlaceholder", posts[20 * i + 5]).replace("textPlaceholder", txt).replace("datePlaceholder", date);
				newDiv = "<div class = 'posts w3-light-blue'>" + newDiv + "</div>";
				$('#newsFeedContainer').add(newDiv).appendTo('#newsFeedContainer');

		}
	});
};

function countDivs(identifier)
{
	var i = 0;
	$(identifier).each(function(index){
		i ++;
	});
	return i;
};


function moarLikes(){
	var str = $(document.getElementById('likeButton')).parent().children("#likesNum").text();
	var likes = str.slice(12, str.length);
	likes ++;
	var final = "Post score: " + likes;
	console.log(final);
	$(document.getElementById('likeButton').nextSibling).empty();
	$(document.getElementById('likeButton').nextSibling).append('' + final);
}

$(document).ready(function(){

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
});