var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var students = require('./routes/students');
var mysql = require('mysql');
var md5 = require('MD5');
var rest = require("./REST.js");

var app = express();
var result = [];
var fields;
var students;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/students', students);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});



module.exports = app;


//MySQL connection setup
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'password',
	database: 'movies'
});

//Log errors instead of terminating localhost server connection
process.on('uncaughtException', function (err) {
    console.log(err);
}); 

//Connect to server
connection.connect();

//Create query to select all rows in the db
var selectAll = "select * from favmovies";

var showTables = function(){
	return "SHOW tables";
}


connection.query("SELECT * from students", function(err, res, fields){
	if(err){
		throw err;
	}
	else{
		result = [];
		// console.log("id|    name      | location");
		for (i = 0; i < res.length; i++){
			line = ""
			// console.log(res[i].id + " | " +res[i].name+ " | " +res[i].location);
			line += res[i].id + " | " +res[i].first_name+ " | " +res[i].last_name + "\n"
			result.push(res[i]);
		}
		students = result;
		app.locals.test = "Something";
		app.locals.test2 = result[1];
	}
})

//Create a mySQL formated query for student data in the student database
var formatStudentData = function(table, id, first_name, last_name, age, grade, school, parent_first_name,
 parent_last_name, address_street, address_city, address_state, address_zipcode, phone_number){
	formattedString = "INSERT INTO " + 
	table +
	' (id, first_name, last_name, age, grade, school, parent_first_name, parent_last_name, address_street,'+
 	'address_city, address_state, address_zipcode, phone_number) VALUES ("' +
	+id +'", "'+ 
	first_name +'", "'+ 
	last_name +'", "'+ 
	age +'", "'+ 
	grade +'", "'+ 
	school +'", "'+ 
	parent_first_name +'", "'+  
	parent_last_name +'", "'+ 
	address_street +'", "'+ 
	address_city +'", "'+
	address_state +'", "'+ 
	address_zipcode +'", "'+ 
	phone_number + '")';
	return formattedString;
}

//Sends query to mySQL server and processes the response
var insertStudentData = function(formatedStudentData){
	connection.query(formatedStudentData, function(err, res){
		if(!err){
			console.log("RESULT: " + res);
		}
	});
	connection.end();
}

var luther = formatStudentData('students', 1, 'Luther', 'Banner', 15, 10, 'St. Louis High School', 'Marie', 'Banner',
 '252 Memorial Drive', 'St. Louis', 'Missouri', '63101', '555-312-2432');

var jeremy = formatStudentData('students', 2, 'Jeremy', 'Smith', 17, 11, 'East Bay High School', 'John', 'Smith',
	'350 Amherst Way', 'Oakland', 'California', '94605', '555-895-5247');
