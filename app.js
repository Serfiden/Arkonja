/////////////
/////////////
// GENERAL //
/////////////
/////////////

var mysql = require('mysql');
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

var express = require('express');

var app = express();

var server = app.listen(process.env.PORT || 8000, function(){
	console.log('Connected to server on port ' + server.address().port + '!');
});

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
	conn.query('SELECT password FROM pachoioano WHERE username = ?', req.params.user, function(err, results){
		if(err) throw err;
		if(results != '[]') sessionUser = req.params.user;
		res.send(results);
	});
});

app.get('/selectExisting/:user', function(req, res){
	conn.query('SELECT id FROM pachoioano WHERE username = ?', req.params.user, function(err, results){
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

///////////////
///////////////
// MAIN PAGE //
///////////////
///////////////

app.get('/index.html', function(req, res){
	res.sendFile(__dirname + '/Main/index.html');
});

app.get('/style.css', function(req, res){
	res.sendFile(__dirname + '/Main/style.css');
});

app.get('/script.js', function(req, res){
	res.sendFile(__dirname + '/Main/script.js');
});

app.get('/textIconPost.png', function(req, res){
	res.sendFile(__dirname + '/Imgs/textIconPost.png');
});

app.get('/imgIconPost.png', function(req, res){
	res.sendFile(__dirname + '/Imgs/imgIconPost.png');
});

app.get('/sessionbro', function(req, res){
	res.send(sessionUser);
});

//////////////////////////////////

app.get('/register.html', function(req, res){
	res.sendFile(__dirname + '/register.html');
});


// 



