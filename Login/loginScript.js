$(document).ready(function(){

	$('#loginBtn').click(function(){

		var user = document.getElementById('username').value;
		var pass = document.getElementById('pass').value;
		$.get('/selectExisting/' + user, function(data){
			var str = JSON.stringify(data);
			var txt = str.split('\"');
			console.log(txt);
			if(txt[0] == '[]')
			{
				$('#userPar').css('color', 'red');
				document.getElementById('username').value = '';
				return;
			}
			$.get('/selectUser/' + user, function(data){
				var str = JSON.stringify(data);
				var txt = str.split('\"');
				if(txt[3] == pass)
				{
					window.location.href = 'index.html'
					return;
				}
				$('#passPar').css('color', 'red');
			});
		});
	});
});