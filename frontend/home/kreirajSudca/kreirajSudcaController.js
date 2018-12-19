angular.module('SportApp')
.controller('kreirajSudcaController', ['$scope', '$location', '$http', 'toastr', 'AuthService','$window', function ($scope, $location, $http, toastr, AuthService,$window){
	
	$scope.showm = true

	$scope.createReferee=function(referee){
		$http.post("api/create/referee", referee).then (function(response){
			$scope.message=response.data
			$window.location.reload()
		})
		.catch(err => toastr.error(err.data))
	}
	$http.get('api/create/referees').then(function(response){
		$scope.getAllReferee = response.data
	})
}])
