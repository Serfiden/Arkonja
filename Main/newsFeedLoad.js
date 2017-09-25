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

function getLikes(arg){
	var txt = arg.split("}");
	var newArgs = txt[0];
	var tempString = "";
	for(var i = 1; i < newArgs.length; i ++)
	{
		tempString += newArgs[i];
	}
	return tempString;
}

function refreshFeed(template){
	$.get('/loadNewsFeed', function(data){
		var str = JSON.stringify(data);
		var posts = str.split("\"");		
		for(var i = 0; i < (posts.length / 19); i ++){
				var txt = decodeText(separateChars(posts[20 * i + 18]));
				var date = posts[20 * i + 9];
				var likes = getLikes(posts[20 * i + 20]);
				var newDiv = "";
				if(likes != 0)
					newDiv = template.replace("usernamePlaceholder", posts[20 * i + 5]).replace("textPlaceholder", txt).replace("datePlaceholder", date).
				replace("Post score: 0", "Post score: " + likes).replace("none", "inline");
				else 
					newDiv = template.replace("usernamePlaceholder", posts[20 * i + 5]).replace("textPlaceholder", txt).replace("datePlaceholder", date);
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