angular.module('zaNaCtrl', ['ngAnimate', 'toastr'])
.controller('zapocniNatjecanjeController', ['$scope', '$location', '$http', 'toastr', 'AuthService', function ($scope, $location, $http, toastr, AuthService){
	$scope.showme = true

		$http.get("api/create/findCompetitions").then (function(response){
			$scope.allCompetitions=response.data
		})

		$scope.selected=[]
		
 	$scope.exist=function(item){
  		return $scope.selected.indexOf(item)> -1;
 	}

 	$scope.toggleSelection=function(item){
  		var idx=$scope.selected.indexOf(item._id)
  		if(idx > -1){
   			$scope.selected.splice(idx,1);
  		}
  		else{
   			$scope.selected.push(item._id)
  		}
 	}
		$scope.generateReferee=function(){
			$http.get("api/create/competitionInfo/"+ $scope.selected[0] ).then (function(response){
				$scope.specificCompetitions=response.data.reportedTeams
				console.log($scope.specificCompetitions.reportedTeams)
				console.log(response.data)
			})
		}

}])