angular.module('SportApp')
.controller('prijavaTimaController', ['$scope', '$location', '$http', 'toastr', 'AuthService', function ($scope, $location, $http, toastr, AuthService){
	
	$scope.showme = true

	$scope.findTeam=function(teamName){
			$http.get("api/create/findTeam/" + teamName).then (function(response){
			$scope.showMeCompetitions=true;
			$scope.allTeams=response.data
		}) .catch(err => toastr.error(err.data))
	}
		$http.get("api/create/findCompetitions").then (function(response){
			$scope.allCompetitions=response.data
		})

	$scope.selectedTim=[]
	$scope.selected=[]
 	$scope.exist=function(item){
  		return $scope.selected.indexOf(item)> -1;
 	}

 	$scope.toggleSelection=function(item){
  		var idx=$scope.selected.indexOf(item._id)
  		if(idx > -1){
   			$scope.selected.splice(idx,1);
        registration.team();
  		}
  		else{
   			$scope.selected.push(item._id)
        registration.team();
  		}
 	}
 		$scope.existTeam=function(item){
  		return $scope.selectedTim.indexOf(item)> -1;
 	}

 	$scope.toggleSelectionTeam=function(item){
  		var idx=$scope.selectedTim.indexOf(item._id)
  		if(idx > -1){
   			$scope.selectedTim.splice(idx,1);
        registration.team();
  		}
  		else{
   			$scope.selectedTim.push(item._id);
        registration.team();
  		}
 	}
  var registration = this;
  registration.team=function(){
  if($scope.selectedTim.length == "0" || $scope.selected.length == "0"){
      $scope.save = false
  }else{
      $scope.save = true
    }
  }

 	$scope.registerOnCompetition=function(){
 		$scope.timeId=$scope.selectedTim[0];
 		$scope.competitionId=$scope.selected[0];
 		$http.post("api/create/registrationOnCompetition/" + $scope.competitionId + "/" + $scope.timeId).then (function(response){
			$scope.registrationOnCompetition=response.data
      		toastr.success('Uspješno prijavljen tim')
            location.reload();
		})
 	}
}])