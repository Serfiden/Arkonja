var user;
$.get('/sessionbro', function(data){
	user = JSON.stringify(data);
	var str = user.split("\"");
	user = str[1];
});


$(document).ready(function(){
	$('#postBtn').click(function(){
		var postText = document.getElementById('inputBox').value;
		$('#newsFeedContainer').add("<div class = 'posts style = 'font-family:inherit'><p>" + 
			user + " wrote: " + postText + "</p><div>").appendTo('#newsFeedContainer');
		document.getElementById('inputBox').value = '';
	});
});