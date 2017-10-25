angular.module('krNaCtrl', ['ngAnimate', 'toastr'])
.controller('kreirajNatjecateljaController', ['$scope', '$location', '$http', 'toastr', 'AuthService', function ($scope, $location, $http, toastr, AuthService){
	$scope.createPlayer=function(player){
		console.log(player);
		$http.post("api/create/player").then (function(data){
			console.log(data);
		})
	}

   
    
}])