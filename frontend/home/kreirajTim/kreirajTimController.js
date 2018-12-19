angular.module('SportApp')
.controller('kreirajTimController', ['$scope', '$location', '$http', 'toastr', 'AuthService', function ($scope, $location, $http, toastr, AuthService){

	$scope.showm = true
$scope.show = false

	$scope.findPlayers = function(playerName){
		$http.get('api/create/specificPlayers/' + playerName).then(function(response){
			$scope.allPlayers = response.data
			console.log($scope.allPlayers);
			
		})
		   $scope.player.firstName = '';
		$scope.natjecatelji = true
	}

	$scope.findReferee=function(referee){
			$http.get('api/create/referees/' + referee).then(function(response){
			$scope.allReferee = response.data
			
		})
			$scope.sudci = true
	}
	$scope.selected=[]
	$scope.selected1=[]
	$scope.selectedReferee=[]
	$scope.selectedReferee1=[]
 	$scope.exist=function(item){
  		return $scope.selected.indexOf(item)> -1;
 	}

 	$scope.toggleSelection=function(item){
  		var idx=$scope.selected.indexOf(item._id)
  		var idx=$scope.selected1.indexOf(item)
  		$scope.show = true
  		if(idx > -1){
   			$scope.selected.splice(idx,1);
   			$scope.selected1.splice(idx,1);
        check.team()
  		}
  		else{
   			$scope.selected.push(item._id)
   			$scope.selected1.push(item)
         check.team()
  		}

 	}
 	$scope.existReferee=function(item){
  		return $scope.selectedReferee.indexOf(item)> -1;
  		return $scope.selectedReferee1.indexOf(item)> -1;
 	}

 	$scope.toggleSelectionReferee=function(item){
  		var idx=$scope.selectedReferee.indexOf(item._id)

  		var idx=$scope.selectedReferee1.indexOf(item)
  		if(idx > -1){
   			$scope.selectedReferee.splice(idx,1);
   			$scope.selectedReferee1.splice(idx,1);
        check.team()
  		}
  		else{
   			$scope.selectedReferee.push(item._id)
   			$scope.selectedReferee1.push(item)
        check.team()
  		}
 	}

    var check = this;
    check.team=function(){
    if($scope.selected1.length == "0" || $scope.selectedReferee1.length == "0"){
          $scope.create= false
       }else{
        $scope.create= true
      }
    }

 	$scope.creatTeam=function(teamName){
 		$scope.team={}
 		$scope.team.teamName=teamName
 		$scope.team.players=$scope.selected
 		$scope.team.refereeForThisTeam=$scope.selectedReferee[0]
 	
 		$http.post('api/create/team',$scope.team).then(function(response){
 			toastr.success('Uspješno kreiran tim')
		})
 	}
}])