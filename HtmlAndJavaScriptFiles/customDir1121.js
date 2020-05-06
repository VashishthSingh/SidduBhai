var app = angular.module("myApp", ["ngRoute","ngCookies"]);

app.config(function($routeProvider) {
    		$routeProvider  
    		.when("/", {
        		templateUrl : "login.html",
        		controller: "loginControllerForAdminAndUSer"
    		})
    		.when("/logOut", {
    			templateUrl : "login.html",
        		controller: "loginControllerForAdminAndUSer"
    		})
    		.when("/report", {
    			resolve:{
    				"check":function($location,$cookies){
    					if($cookies.get('username')==0){
    						$location.path('/');
    					}
    				}
    			},
        		templateUrl : "index101.html",
        		controller: "myCtrl"
    		})
    		.when("/admin", {
    			resolve:{
    				"check":function($location,$cookies){
    					if($cookies.get('username')==2){
    						$location.path('/menu');
    					}
    					else if($cookies.get('username')==0){
    						$location.path('/');
    					}
    				}
    			},
        		templateUrl : "index111.html",
        		controller: "myCtrl1"
    		})
    		.when("/report1", {
    			resolve:{
    				"check":function($location,$cookies){
    					if($cookies.get('username')==0){
    						$location.path('/');
    					}
    				}
    			},
    			templateUrl : "customDirective21.html",
    			controller:"MyCtrl2"
    		})
    		.when("/menu", {
    			resolve:{
    				"check":function($location,$cookies){
    					if($cookies.get('username')==0){
    						$location.path('/');
    					}
    				}
    			},
        		templateUrl : "index7CDirLogin.html",
        		controller:"menuController"
    		})
    		.when("/userManagement", {
    			resolve:{
    				"check":function($location,$cookies){
    					if($cookies.get('username')==2){
    						$location.path('/menu');
    					}
    					else if($cookies.get('username')==0){
    						$location.path('/');
    					}
    				}
    			},
        		templateUrl : "userMngt.html"
    		})
    		.when("/addAdminUser", {
    			resolve:{
    				"check":function($location,$cookies){
    					if($cookies.get('username')==2){
    						$location.path('/menu');
    					}
    					else if($cookies.get('username')==0){
    						$location.path('/');
    					}
    				}
    			},
        		templateUrl : "addAdminUser.html",
        		controller:"addAdminUserController"
        		
    		})
    		.when("/deleteAdminUser", {
    			resolve:{
    				"check":function($location,$cookies){
    					if($cookies.get('username')==2){
    						$location.path('/menu');
    					}
    					else if($cookies.get('username')==0){
    						$location.path('/');
    					}
    				}
    			},
        		templateUrl : "deleteAdminUser.html",
        		controller:"deleteAdminUserController"
        		
    		})
    		.when("/changePassword", {
    			resolve:{
    				"check":function($location,$cookies){
    					if($cookies.get('username')==0){
    						$location.path('/');
    					}
    				}
    			},
        		templateUrl : "changePassword.html",
        		controller:"changePasswordController"
        		
    		})
    		.when("/getAllUsers", {
    			resolve:{
    				"check":function($location,$cookies){
    					if($cookies.get('username')==2){
    						$location.path('/menu');
    					}
    					else if($cookies.get('username')==0){
    						$location.path('/');
    					}
    				}
    			},
        		templateUrl : "getUsers.html",
        		controller:"getUsersController"
    		})
    		.otherwise({
        		redirectTo : "/"
    		})
});

app.controller('menuController',['$cookies','$window','$http','$scope','$location',function($cookies,$window,$http,$scope,$location){
	
	$scope.setDecider=true;
	if($cookies.get('username')==2){
		$scope.setDecider=false;
	}
	
	$scope.setDecider1=false;
	if($cookies.get('username')==2){
		$scope.setDecider1=true;
	}
	
}]);

app.controller('getUsersController',['$cookies','$window','$http','$scope','$location',function($cookies,$window,$http,$scope,$location){
	
//	$("#tbUser").on('click', '.btnDelete', function () {
//		
//	    $(this).closest('tr').remove();   // will remove the row
//	    
//	    var item = $(this).closest("tr")   // Finds the closest row <tr> 
//        .find(".username")                  // Gets a descendent with class=username"
//        .text();                            // Retrieves the text within <td>
//	    
//	    //$window.alert(item);
//	    
//	    $http({
//			url:"http://localhost:8080/AngularCDWLUserMngnt2/DeleteAdminUserServlet",
//			method:"GET",
//			params:{
//				"userName":item,
//			}
//		}).then(function(response){
//			//code on success
//			//$window.alert(response.data);
//		},function(response){
//			//code on connection failed
//			$window.alert("Connection Failed");
//		});
//	    
//	});
	
	$http({
		url:"http://localhost:8080/AngularCDWLUserMngnt2/AngularJsServlet3",
		method:"GET",
	}).then(function(response){
		$scope.JSONData=response.data.myArrayList;
		$scope.statusCode=response.status;
		//console.log(response.data.myArrayList);
	},function(response){
		$window.alert("Connection Failed");
	});
	
	$scope.deleteRow= function (index) {
	    
		var userName=$scope.JSONData[index].map.username;  // getting deleted row username 
		var passWord=$scope.JSONData[index].map.password
		var isAdminOrNotUserRole=$scope.JSONData[index].map.userRole
	    console.log(userName+" "+passWord+" "+isAdminOrNotUserRole);

		$scope.JSONData.splice(index, 1); // delete the row 

		$http({
			url:"http://localhost:8080/AngularCDWLUserMngnt2/DeleteAdminUserServlet",
			method:"GET",
			params:{
				"userName":userName,
			}
		}).then(function(response){
		},function(response){
			$window.alert("Connection Failed");
		});
		
	};//end of deleteRow function
	
}]);// end of controller

app.controller('changePasswordController',['$cookies','$window','$http','$scope','$location',function($cookies,$window,$http,$scope,$location){
	
	$scope.setDeciderForChangePass=true;
	if($cookies.get('username')==2){
		$scope.setDeciderForChangePass=false;
	}
	
	$scope.setDecForChPass1=false;
	$scope.setDecForChPass2=true;
	if($cookies.get('username')==2){
		$scope.setDecForChPass1=true;
		$scope.setDecForChPass2=false;
	}
	
	$scope.updatePasswordFunction=function(){
		
		var uname=$scope.username;
		var pass=$scope.password;
		var newpass=$scope.newpassword;
		
		console.log(uname+" "+pass);
		
		$http({
			url:"http://localhost:8080/AngularCDWLUserMngnt2/UpdatePasswordServlet",
			method:"GET",
			params:{
				"userName":uname,   //$scope.username,
				"passWord":pass,      //$scope.password
				"newpassWord":newpass  //$scope.newpassword
			}
		}).then(function(response){
			$window.alert(response.data);
		},function(response){
			$window.alert("Connection Failed With AddAdminUserServlet");
		});
		
	};
}]);

app.controller('deleteAdminUserController',['$cookies','$window','$http','$scope','$location',function($cookies,$window,$http,$scope,$location){
	$scope.deleteAdminUserFunction=function(){
		
		var uname=$scope.username;
		console.log(uname);
		
		$http({
			url:"http://localhost:8080/AngularCDWLUserMngnt2/DeleteAdminUserServlet",
			method:"GET",
			params:{
				"userName":uname   //$scope.username,
			}
		}).then(function(response){
			$window.alert(response.data);
		},function(response){
			$window.alert("Connection Failed With AddAdminUserServlet");
		});
		
	};
}]);

app.controller('addAdminUserController',['$cookies','$window','$http','$scope','$location',function($cookies,$window,$http,$scope,$location){
	
	$scope.names=["Admin","User"];
	
	$scope.addAdminUserFunction=function(){
		
		var uname=$scope.username;
		var pass=$scope.password;
		var adminOrUserName=$scope.selectedName;
		console.log(uname+" "+pass+" "+adminOrUserName);

		$http({
			url:"http://localhost:8080/AngularCDWLUserMngnt2/AddAdminUserServlet",
			method:"GET",
			params:{
				"userName":uname,   //$scope.username,
				"passWord":pass,      //$scope.password
				"adminOrUserName":adminOrUserName   //$scope.selectedName
			}
		}).then(function(response){
			$window.alert(response.data);
		},function(response){
			$window.alert("Connection Failed With AddAdminUserServlet");
		});

	};//end of addAdminUserFunction
	
}]);

app.controller('loginControllerForAdminAndUSer',['$cookies','$window','$http','$scope','$location',function($cookies,$window,$http,$scope,$location){
	
	$cookies.put("username", 0);
	
	$scope.submit=function(){
		
		var uname=$scope.username;
		var pass=$scope.password;

		// For User Login Management
		$http({
			url:"http://localhost:8080/AngularCDWLUserMngnt2/AdminUserLoginServlet",
			method:"GET",
			params:{
				"userName":uname,   //$scope.username,
				"passWord":pass      //$scope.password
			}
		}).then(function(response){
			$scope.loggedInOrNot=response.data;
			//console.log(response.data);
			//console.log($scope.loggedInOrNot.found+" "+$scope.loggedInOrNot.isAdminOrNot);
			if($scope.loggedInOrNot.found=="yes"){
				if($scope.loggedInOrNot.isAdminOrNot=="yes")
					$cookies.put("username", 1);
				else
					$cookies.put("username", 2);
				$location.path('/menu');
			}
			else{
				$window.alert("Invalid Credential");
			}
		},function(response){
			$window.alert("Connection Failed With AdminUserLoginServlet");
		});
		
	};
}]);		
		
app.controller('myCtrl',['$cookies','$scope','$window','$http',function($cookies,$scope,$window,$http){  // $scope , $window , $http
	
	$scope.setDeciderForReport=true;
	if($cookies.get('username')==2){
		$scope.setDeciderForReport=false;
	}
	
	$scope.dataArrayList=function(){

				var ramData = [];
				var diskData = [];
				var cpuData = [];
				var readDTData = [];

				var data1=$('#datetimepicker1').val();
				var data2=$('#datetimepicker2').val();
				//alert("Checking "+data1+" "+data2);

				$http({
					url:"http://localhost:8080/AngularCDWLUserMngnt2/AngularJsServlet1",
					method:"GET",
					params:{
						"startRange":data1,   //$scope.startRange,
						"endRange":data2      //$scope.endRange
					}
				}).then(function(response){
					$scope.JSONData=response.data.myArrayList;
					$scope.statusCode=response.status;

// 					console.log($scope.JSONData.length);
// 					console.log($scope.JSONData[0]);
// 					console.log($scope.JSONData[0].map.cpuUsed);
// 					console.log($scope.JSONData[0].map.diskUsed);
// 					console.log($scope.JSONData[0].map.ramUsed);

					var i;
					for (i = 0; i <$scope.JSONData.length; i++) {
						// Inserting values to Array
					  ramData.push($scope.JSONData[i].map.ramUsed);
					  diskData.push($scope.JSONData[i].map.diskUsed);
					  cpuData.push($scope.JSONData[i].map.cpuUsed);
					  readDTData.push($scope.JSONData[i].map.readDateAndTime);
					  //console.log($scope.JSONData[i].map.ramUsed +" "+$scope.JSONData[i].map.diskUsed);
					}

					//$window.alert(JSONData);
				},function(response){
					$window.alert("Connection Failed");
				});
				
	//--------------------------------------------------------------
		var ctx = document.getElementById("myChartRam"); 
		
		Chart.defaults.global.defaultFontFamily='Lato';
		Chart.defaults.global.defaultFontSize=18;
		Chart.defaults.global.defaultFontColor='black';	
			
		var myChart = new Chart(ctx, { 
			type: 'line',  
			data: { 
				labels: readDTData, 
				datasets: [{ 
					label: '# RAM Utilization', 
					data: ramData, 
					backgroundColor :"green", 
					borderColor: "green", 
					borderWidth : 4,
					fill: false
				},
				{
					label: '# DISK Utilization',
					data: diskData,
					backgroundColor: 'blue',
					borderColor: 'blue',
					borderWidth : 4,
					fill: false
				},
				{
					label: '# CPU Utilization',
					data: cpuData,
					backgroundColor: 'red',
					borderColor: 'red',
					borderWidth : 4,
					fill: false
				}] 
			}, 
			
			plugins: [{
				beforeLayout: function (chart) {
					chart.width = chart.canvas.width * 1.0;
					chart.options.layout.padding.left = 0;
				},
			}],
			
			options: { 
				responsive: true,
				title:{
					display:true,
					text:"RAM , DISK AND CPU UTILIZATION IN % ",
					fontSize:25
				},
				tooltips:{
					enabled:true,
					backgroundColor:"black",
					fontColor:"white"
				},
				scales: { 
					xAxes: [{
						display: true,
						ticks: { 
							beginAtZero:false 
						},
						scaleLabel: {
							display: true,
							labelString: 'DATE_AND_TIME'
						}
					}],
					yAxes: [{
						display: true,
						ticks: { 
							beginAtZero:false 
						},
						scaleLabel: {
							display: true,
							labelString: 'READINGS'
						}
					}] 
				} 
			} 
		});
	//--------------------------------------------------------------
		    		
		}//end of function
		
			$('#datetimepicker1').datetimepicker({
				format: 'Y-m-d H:i:i',
				formatTime: 'H:i:i',
				formatDate: 'Y-m-d',
				step: 30
			});
			$('#datetimepicker2').datetimepicker({
				format: 'Y-m-d H:i:i',
				formatTime: 'H:i:i',
				formatDate: 'Y-m-d',
				step: 30
			});
				
}]);

app.controller('myCtrl1',['$cookies','$scope','$window','$http',function($cookies,$scope,$window,$http){  // $scope , $window , $http
			
	$scope.setDeciderForAdmin=true;
	if($cookies.get('username')==2){
		$scope.setDeciderForAdmin=false;
	}
	
	$scope.startBtn=function(){
		$http({
			url:"http://localhost:8080/AngularCDWLUserMngnt2/StartFetchingData",
			method:"GET",
		}).then(function(response){
					$scope.statusCode=response.status;
			},function(response){
					$window.alert("Connection Failed");
			}
		);//end of then
	}

	$scope.stopBtn=function(){
		$http({
			url:"http://localhost:8080/AngularCDWLUserMngnt2/StopFetchingData",
			method:"GET",
			}).then(function(response){
					$scope.statusCode=response.status;
			},function(response){
					$window.alert("Connection Failed");
			}
			);//end of then
	}//end of function
}]);

app.directive('mydirc',['$http','$window',function($http,$window) {
    
	return {
        restrict: 'EAC',
        scope: false,  // false , true , {}
        link: function($scope) {
            $scope.clickMe= function() {
                //alert('inside click');

              //---------- Plotting Graph ----------------------------------------------------
                var ctx = document.getElementById("myChartRam"); 

                Chart.defaults.global.defaultFontFamily='Lato';
                Chart.defaults.global.defaultFontSize=18;
                Chart.defaults.global.defaultFontColor='black';	
                	
                var myChart = new Chart(ctx, { 
                	type: 'line',  
                	data: { 
                		labels: $scope.readDTData, 
                		datasets: [{ 
                			label: '# RAM Utilization', 
                			data: $scope.ramData, 
                			backgroundColor :"green", 
                			borderColor: "green", 
                			borderWidth : 4,
                			fill: false
                		},
                		{
                			label: '# DISK Utilization',
                			data: $scope.diskData,
                			backgroundColor: 'blue',
                			borderColor: 'blue',
                			borderWidth : 4,
                			fill: false
                		},
                		{
                			label: '# CPU Utilization',
                			data: $scope.cpuData,
                			backgroundColor: 'red',
                			borderColor: 'red',
                			borderWidth : 4,
                			fill: false
                		}] 
                	}, 
                	
                	plugins: [{
                		beforeLayout: function (chart) {
                			chart.width = chart.canvas.width * 1.0;
                			chart.options.layout.padding.left = 0;
                		},
                	}],
                	
                	options: { 
                		responsive: true,
                		title:{
                			display:true,
                			text:"RAM , DISK AND CPU UTILIZATION IN % ",
                			fontSize:25
                		},
                		tooltips:{
                			enabled:true,
                			backgroundColor:"black",
                			fontColor:"white"
                		},
                		scales: { 
                			xAxes: [{
                				display: true,
                				ticks: { 
                					beginAtZero:false 
                				},
                				scaleLabel: {
                					display: true,
                					labelString: 'DATE_AND_TIME'
                				}
                			}],
                			yAxes: [{
                				display: true,
                				ticks: { 
                					beginAtZero:false 
                				},
                				scaleLabel: {
                					display: true,
                					labelString: 'READINGS'
                				}
                			}] 
                		} 
                	} 
                });
                //-----------End Of Plotting Graph---------------------------------------------------

            }//end of clickMe()

        }//end of link function

    };//end of return

}]);//end of directive


app.controller('MyCtrl2',['$cookies','$scope','$window','$http',function($cookies,$scope,$window,$http){  
	
	$scope.setDeciderForReport1=true;
	if($cookies.get('username')==2){
		$scope.setDeciderForReport1=false;
	}
	$scope.setDeciderForReport2=false;
	if($cookies.get('username')==2){
		$scope.setDeciderForReport2=true;
	}
	
	$scope.getRangeAndData=function(){
		
		$scope.data11=$('#datetimepicker11').val();
		$scope.data22=$('#datetimepicker22').val();
		//Printing Ranges On Console
	    console.log($scope.data11+" "+$scope.data22);
	    
		$scope.ramData = [];
		$scope.diskData = [];
		$scope.cpuData = [];
		$scope.readDTData = []; 
		
		$http({
			url:"http://localhost:8080/AngularCDWLUserMngnt2/AngularJsServlet1",
			   //http://localhost:8080/AngularCDWLUserMngnt2/AngularJsServlet1
			method:"GET",
			params:{
				"startRange":$scope.data11,   //$scope.startRange,
				"endRange":$scope.data22     //$scope.endRange
			}
		}).then(function(response){
			$scope.JSONData=response.data.myArrayList;
			$scope.statusCode=response.status;

			var i;
			for (i = 0; i <$scope.JSONData.length; i++) {
				// Inserting values to Array
				$scope.ramData.push($scope.JSONData[i].map.ramUsed);
				$scope.diskData.push($scope.JSONData[i].map.diskUsed);
				$scope.cpuData.push($scope.JSONData[i].map.cpuUsed);
				$scope.readDTData.push($scope.JSONData[i].map.readDateAndTime);
			}
		},function(response){
			$window.alert("Connection Failed");
		});
		
		// Printing data on console
		console.log($scope.ramData);
		console.log($scope.diskData);
		console.log($scope.cpuData);
		console.log($scope.readDTData);
	    
	}//end of function
	
	$('#datetimepicker11').datetimepicker({
		format: 'Y-m-d H:i:i',
		formatTime: 'H:i:i',
		formatDate: 'Y-m-d',
		step: 30
	});
	$('#datetimepicker22').datetimepicker({
		format: 'Y-m-d H:i:i',
		formatTime: 'H:i:i',
		formatDate: 'Y-m-d',
		step: 30
	});	
	
}]);

		