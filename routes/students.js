var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var allStudentsResponse = {};
var students = [];
var searchString;
var searchResult;
var mysqlResult;


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

connection.query("SELECT * from students", function(err, res, fields){
	if(err){
		throw err;
	}
	else{
		students = [];
		for (i = 0; i < res.length; i++){
			students.push({id:res[i].id,
			 first_name: res[i].first_name,
			 last_name:res[i].last_name,
			 age:res[i].age,
			 grade:res[i].grade,
			 school:res[i].school,
			 parent_first_name:res[i].parent_first_name,
			 parent_last_name:res[i].parent_last_name,
			 address_street:res[i].address_street,
			 address_city:res[i].address_city,
			 address_state:res[i].address_state,
			 address_zipcode:res[i].address_zipcode,
			 phone_number:res[i].phone_number
			});
		}
		allStudentsResponse = {students:students};
	}
})


	
/* GET students listing. */
router.get('/', function(req, res, next) {
  res.json(allStudentsResponse);
});

router.get('/search', function(req, res, next){
	if(searchResult != null){
		res.json(searchResult);
	}

	if(searchString === ""){
		res.json(allStudentsResponse);
	}
})

router.get('/mysql', function(req, res, next){
	if(mysqlResult != null){
		res.json(mysqlResult);
	}

	if(searchString === ""){
		res.json(mysqlResult);
	}
})

router.post('/', function(req, res){
	console.log("search string: " + req.body.searchString);
	connection.query("SELECT * from students WHERE first_name LIKE '%"+req.body.searchString+"%'", function(err, res, fields){
	if(!err){
		students=[];
		for (i = 0; i < res.length; i++){
			students.push({id:res[i].id,
			 first_name: res[i].first_name,
			 last_name:res[i].last_name,
			 age:res[i].age,
			 grade:res[i].grade,
			 school:res[i].school,
			 parent_first_name:res[i].parent_first_name,
			 parent_last_name:res[i].parent_last_name,
			 address_street:res[i].address_street,
			 address_city:res[i].address_city,
			 address_state:res[i].address_state,
			 address_zipcode:res[i].address_zipcode,
			 phone_number:res[i].phone_number
			});
		}

	}
	else{
		throw err;
	}

	searchResult =  {students:students};
	console.log("first time: " + searchResult);
		
	})
	res.json({res: "Successful"});
})

router.post('/mysql', function(req, res){
	var mysqlQuery = req.body.searchString;
	mysqlQuery = mysqlQuery.substr(mysqlQuery.indexOf(" ") + 1);
	console.log(mysqlQuery);
	connection.query(mysqlQuery, function(err, res, fields){
	if(!err){
		students=[];
		for (i = 0; i < res.length; i++){
			students.push({id:res[i].id,
			 first_name: res[i].first_name,
			 last_name:res[i].last_name,
			 age:res[i].age,
			 grade:res[i].grade,
			 school:res[i].school,
			 parent_first_name:res[i].parent_first_name,
			 parent_last_name:res[i].parent_last_name,
			 address_street:res[i].address_street,
			 address_city:res[i].address_city,
			 address_state:res[i].address_state,
			 address_zipcode:res[i].address_zipcode,
			 phone_number:res[i].phone_number
			});
		}

	}
	else{
		throw err;
	}

	mysqlResult =  {students:students};
	console.log("first time: " + mysqlResult);
		
	})
	res.json({res: "Successful"});
})


module.exports = router;