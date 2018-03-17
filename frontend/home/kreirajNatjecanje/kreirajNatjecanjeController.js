angular.module('SportApp')
.controller('kreirajNatjecanjeController', ['$scope', '$location', '$http', 'toastr', 'AuthService', '$window',function ($scope, $location, $http, toastr, AuthService,$window){
	
	$scope.showme = true
	$scope.createCompetition=function(competition){
		$http.post("api/create/competition", competition).then (function(response){
			$scope.message=response.data
			$window.location.reload()
		})
	}

		$http.get('api/create/findCompetitions').then(function(response){
		$scope.findCompetitions = response.data
		console.log($scope.findCompetitions)
	})
}])