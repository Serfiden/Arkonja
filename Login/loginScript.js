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
		 		$('#succ').empty();
			 	$('#succ').append('Username does not exist!');
			 	return;
			}
			$.get('/selectUser/' + user, function(data){
				var str = JSON.stringify(data);
				var txt = str.split('\"');
				if(txt[3] == pass)
				{
					$('#succ').empty();
					$('#succ').append('LOGIN SUCCESSFUL!');
					// window.location.href = 'index.html'
					return;
				}
				$('#succ').empty();
				$('#succ').append('Incorrect password!');
			});
		});
	});
});