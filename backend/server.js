const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const { Pool } = require('pg');
const pool = new Pool({
  // connectionString: process.env.DATABASE_URL,
  // ssl: true
  database: 'postgres',
  user: 'postgres',
  password: 'root',
  port: 5432,
  host: 'localhost'
});

var app = express();

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/api/newuser', function( request, response) {
	var data = "('" + request.body.fname + "','"  + request.body.lname + "','" + request.body.username + "','" + request.body.password + "');"
	pool.query("insert into users values " + data)
	console.log("User Created")
});

// app.get('/api/getuser', function( request, response) {
// 	var data = "'" + request.body.fname + "';"
// 	pool.query("select lname from tester where fname= " + data)
// 	console.log("User found")
// });


app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
module.exports = app;