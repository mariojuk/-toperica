angular.module('krTmCtrl', ['ngAnimate', 'toastr'])
.controller('kreirajTimController', ['$scope', '$location', '$http', 'toastr', 'AuthService', function ($scope, $location, $http, toastr, AuthService){
	
	$scope.showm = true

	$scope.findPlayers = function(playerName){
		$http.get('api/create/specificPlayers/' + playerName).then(function(response){
			$scope.allPlayers = response.data
		})
	}

	$scope.selected=[]
 
 	$scope.exist=function(item){
  		return $scope.selected.indexOf(item)> -1;
 	}

 	$scope.toggleSelection=function(item){
  		var idx=$scope.selected.indexOf(item.email)
  		if(idx > -1){
   			$scope.selected.splice(idx,1);
  		}
  		else{
   			$scope.selected.push(item.email)
  		}
 	}
}])