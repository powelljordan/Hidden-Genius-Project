myApp.controller('controller', ['$scope', '$http',
		function($scope, $http){

			//Get list of all students when page loads. Remove to start with blank page.
			$http.get("students").
				success(function(data, status, headers, config) {
					$scope.students = data['students'];
    			}).
    			error(function(data, status, headers, config){
    				console.log("GET request for students object failed.");
    			})

    		//Query appropriate routes and serve response based on search entry when we click search
    		$scope.searchString = {};
    		$("#search").click(function(){
    			//Handle mysql requests
    			$scope.searchString['searchString'] = $("#searchString").val();
    			if($("#searchString").val().split(" ")[0] === "mysql"){
	    			$http.post("students/mysql", $scope.searchString).
	    			then(function(response){

	    			}, function(response){
	    				console.log("POST request for students object failed.");
	    			})

	    			$http.get("students/mysql").
	    				success(function(data, status, headers, config){
	    					$scope.students = data['students'];
	    					console.log($scope.students);
	    				}).
	    				error(function(data, status, headers, config){
	    					console.log("GET request for students object failed.");
	    				})
	    			}
    			
    			else{
	    			$("#searchString").val("");
	    			$http.post("students", $scope.searchString).
	    			then(function(response){

	    			}, function(response){
	    				console.log("POST request for students object failed.");
	    			})

	    			$http.get("students/search").
	    				success(function(data, status, headers, config){
	    					$scope.students = data['students'];
	    					console.log($scope.students);
	    				}).
	    				error(function(data, status, headers, config){
	    					console.log("GET request for students object failed.");
	    				})
	    			}

    		})

    		//Query appropriate routes and serve response based on search entry when we press enter
    		$(document).keypress(function(e){
    		 	if(e.which == 13){
	    			$scope.searchString['searchString'] = $("#searchString").val();
	    			$http.post("students", $scope.searchString).
	    			then(function(response){
	    				// $scope.students = response.data['students'];
	    				// console.log($scope.students);
	    			}, function(response){
	    				console.log("POST request for students object failed.");
	    			})

	    			$http.get("students/search").
	    				success(function(data, status, headers, config){
	    					$scope.students = data['students'];
	    					console.log($scope.students);
	    				}).
	    				error(function(data, status, headers, config){
	    					console.log("GET request for students object failed.");
	    			})
    			}

    		})





  			$scope.selection = "";

  			$("#name").click(function(){
  				$scope.selection = "default";
  				$scope.$apply();
  			})

  			$("#age").click(function(){
  				$scope.selection="age";
  				$scope.$apply();
			})
			$("#school").click(function(){
				$scope.selection="school";
				$scope.$apply();
			})

			$("#parent").click(function(){
				$scope.selection="parent";
				$scope.$apply();
			})

			$("#address").click(function(){
				$scope.selection="address"
				$scope.$apply();
			})

			$("#number").click(function(){
				$scope.selection="number"
				$scope.$apply();
			})
			$("#fullBio").click(function(){
				$scope.selection="fullBio"
				$scope.$apply();
			})

			$("#headers .item").click(function () {
			    $("#headers .item").not(this).removeClass('active');
			    $(this).addClass('active');
			});

		}
	])