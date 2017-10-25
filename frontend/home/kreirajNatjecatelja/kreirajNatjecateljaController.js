angular.module('krNaCtrl', ['ngAnimate', 'toastr'])
.controller('kreirajNatjecateljaController', ['$scope', '$location', '$http', 'toastr', 'AuthService', function ($scope, $location, $http, toastr, AuthService){
	
	$scope.showme = true

	$scope.createPlayer=function(player){
		$http.post("api/create/player", player).then (function(response){
			$scope.message=response.data
		})
	}
}])