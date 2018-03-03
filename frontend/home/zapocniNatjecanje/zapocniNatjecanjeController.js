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
			
			$scope.showInfo = true
		})
	}
	$scope.generatePlayerInfo=function(){
		$http.get("api/create/competitionInfo/"+ $scope.selected[0] ).then (function(response){
			$scope.specificCompetition=response.data.reportedTeams
			
			$scope.showInfo3 = true
			
			
		})
	}

	$scope.startCompetition=function(){
		$scope.showInfo1 = true

		$http.post("api/create/startCompetition/"+ $scope.selected[0] ).then (function(response){
			
		})
	}

	$scope.selectedReferee=[]
	$scope.exist=function(item){
  		return $scope.selectedReferee.indexOf(item)> -1;
 	}

 	$scope.togglePlayersAndReferee=function(item,club){
 		
  		var idx=$scope.selectedReferee.indexOf(item)
  		
  		if(idx > -1){
   			$scope.selectedReferee.splice(idx,1);
   			$scope.allOtherPlayers=[]
   			$scope.showInfo3 = false
  		}
  		else{
   			$scope.selectedReferee.push(item)
 			$scope.allOtherPlayers=[]
		angular.forEach($scope.specificCompetitions, function(data){
        	if(data.refereeForThisTeam.club != club){
        		
        		
        		angular.forEach(data.players, function(player){
        			$scope.allOtherPlayers.push(player)
      			});
        	}
        });  
  		}
 	}

 	$scope.selectedPlayers=[]
	$scope.exist=function(item){
  		return $scope.selectedPlayers.indexOf(item)> -1;
 	}

 	$scope.toggleAll=function(item){
  		var idx=$scope.selectedPlayers.indexOf(item)
  	
  		if(idx > -1){
   			$scope.selectedPlayers.splice(idx,1);
  		}
  		else{
   			$scope.selectedPlayers.push(item) 
  		}
 	}
 	$scope.dodjeli_sve=function(){
 		allInOne = {}
 		allInOne.players = $scope.selectedPlayers
 		allInOne.referee = $scope.selectedReferee[0]
 		allInOne.competitionId = $scope.selected[0]
 		$http.post("api/startCompetition/givePlayersReferees/", allInOne).then(function(response){
      angular.forEach($scope.specificCompetitions, function(competition){
          angular.forEach(competition.players, function(player1){
            angular.forEach($scope.selectedPlayers, function(player2){
              if(player1._id.toString() == player2.toString()){
                deletefromArray($scope.specificCompetitions, player1._id)
              }
            })
          })
         
      })
      $scope.selectedPlayers=[]
		})
 	}

  function deletefromArray(arrray, playerId){
    angular.forEach(arrray, function(object){
      angular.forEach(object.players, function(player){
           if(player._id == playerId){
              object.players = object.players.filter(function(el) {
                return el._id !== playerId;
              });
          }
      })   
    })
    $scope.allOtherPlayers=[]
  }
}])