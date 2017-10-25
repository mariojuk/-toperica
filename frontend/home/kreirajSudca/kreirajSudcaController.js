angular.module('krSuCtrl', ['ngAnimate', 'toastr'])
.controller('kreirajSudcaController', ['$scope', '$location', '$http', 'toastr', 'AuthService', function ($scope, $location, $http, toastr, AuthService){
	
	$scope.showm = true

	$scope.createReferee=function(referee){
		$http.post("api/create/referee", referee).then (function(response){
			$scope.message=response.data
		})
	}
}])