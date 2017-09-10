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
});

conn.query("INSERT INTO pachoioano ('username', 'password', 'email') \
VALUES ('Arcais', 'dumbass', 'pulamica@gmail.com')", function(err, res){
	if(err) throw err;
	console.log(res);
});