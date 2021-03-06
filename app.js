/////////////
/////////////
// GENERAL //
/////////////
/////////////

var mysql = require('mysql');
var bodyParser = require('body-parser');
var express = require('express');

var conn = mysql.createConnection({
	'host': 'localhost',
	'user': 'root',
	'password': '',
	'database': 'mydb'
});

conn.connect(function(err){
	if(err) throw err;
	console.log('Connected to database');
})

var app = express();

var server = app.listen(process.env.PORT || 8000, function(){
	console.log('Connected to server on port ' + server.address().port + '!');
});

app.use (bodyParser.json());
app.use (bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res){
	res.sendFile(__dirname + '/Login/login.html');
});

app.get('/jquery.js', function(req, res){
	res.sendFile(__dirname + '/jquery.js');
});

///////////
///////////
// LOGIN //
///////////
///////////


app.get('/loginScript.js', function(req, res){
	res.sendFile(__dirname + '/Login/loginScript.js');
});

app.get('/longboi.png', function(req, res){
	res.sendFile(__dirname + '/Imgs/longboi.png');
});

app.get('/loginStyle.css', function(req, res){
	res.sendFile(__dirname + '/Login/loginStyle.css');
});

var sessionUser = '';

app.get('/selectUser/:user', function(req, res){
	conn.query('SELECT password FROM pachoiano WHERE username = ?', req.params.user, function(err, results){
		if(err) throw err;
		if(results != '[]') sessionUser = req.params.user;
		res.send(results);
	});
});

app.get('/selectExisting/:user', function(req, res){
	conn.query('SELECT id FROM pachoiano WHERE username = ?', req.params.user, function(err, results){
		if(err) throw err;

		res.send(results);
	});
});

/////////////////////
/////////////////////
// RECOVER ACCOUNT //
/////////////////////
/////////////////////

app.get('/recover.html', function(req, res){
	res.sendFile(__dirname + '/Recover/recover.html');
});

app.get('/recover.js', function(req, res){
	res.sendFile(__dirname + 'Recover/recover.js');
});

app.get('/recover.css', function(req, res){
	res.sendFile(__dirname + 'Recover/recover.css');
});

/*
	- should request username and email
	- send email with a randomly generated password
	- update the database with the newly generated password 
*/

///////////////
///////////////
// MAIN PAGE //
///////////////
///////////////

app.get('/index.html', function(req, res){
	if(sessionUser != "")
		res.sendFile(__dirname + '/Main/index.html');
	else res.sendFile(__dirname + '/Login/login.html');
});

app.get('/style.css', function(req, res){
	res.sendFile(__dirname + '/Main/style.css');
});

app.get('/newsfeedStyle.css', function(req, res){
	res.sendFile(__dirname + '/Main/newsfeedStyle.css');
});

app.get('/profileStyle.css', function(req, res){
	res.sendFile(__dirname + '/Main/profileStyle.css');
});

app.get('/script.js', function(req, res){
	res.sendFile(__dirname + '/Main/script.js');
});

app.get('/placePosts.js', function(req, res){
	res.sendFile(__dirname + '/Main/placePosts.js');
});

app.get('/newsFeedLoad.js', function(req, res){
	res.sendFile(__dirname + '/Main/newsFeedLoad.js');
});

app.get('/textIconPost.png', function(req, res){
	res.sendFile(__dirname + '/Imgs/textIconPost.png');
});

app.get('/imgIconPost.png', function(req, res){
	res.sendFile(__dirname + '/Imgs/imgIconPost.png');
});

app.get('/placeholder.png', function(req, res){
	res.sendFile(__dirname + '/Imgs/placeholder.png');
});

app.get('/sessionbro', function(req, res){
	res.send(sessionUser);
});

app.post('/newPost', function(req, res){
	var insertString = "('" + req.body.username + "', '" + req.body.postingDate+ "', '" + req.body.message + "')";
	var queryString = "INSERT INTO arkonjafeed (username, data, msg) VALUES " + insertString;
	conn.query(queryString, function(err, results){
		if(err) throw err;
		console.log(results);
	});
	res.end();
});

app.get('/loadNewsFeed', function(req, res){
	conn.query('SELECT * FROM arkonjafeed ORDER BY id DESC', function(err, results){
		if(err) throw err;
		res.send(results);
	});
});

app.get('/clearNewsFeed', function(req, res){
	conn.query('DELETE FROM arkonjafeed', function(err, results1){
		if(err) throw err;
		conn.query("ALTER TABLE 'arkonjafeed' AUTO_INCREMENT =1", function(err2, results2){
			console.log("News feed successfully cleared!");
			res.send(results2);
		});
	});
});

app.get('/increaseLikesNum/:id', function(req, res){
	conn.query('UPDATE arkonjafeed SET likes = likes + 1 WHERE data = ?', req.params.id, function(err, results){
		if(err) throw err;
		console.log(results);
		res.end();
	});
});

app.get('/decreaseLikesNum/:id', function(req, res){
	conn.query('UPDATE arkonjafeed SET likes = likes - 1 WHERE data = ?', req.params.id, function(err, results){
		if(err) throw err;
		console.log(results);
		res.end();
	});
});

//////////////////////////////////

app.get('/register.html', function(req, res){
	res.sendFile(__dirname + '/register.html');
});


// 


