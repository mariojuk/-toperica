angular.module('SportApp')
.controller('kreirajNatjecateljaController', ['$scope', '$location', '$http', 'toastr', 'AuthService','$window', function ($scope, $location, $http, toastr, AuthService,$window){
	
	$scope.showme = true
    $scope.visible_edit = false
    $scope.player_edit = {}

	$scope.createPlayer=function(player){
		$http.post("api/create/player", player)
		.then (function(response){
			$scope.message=response.data
			$window.location.reload()
		})
		 .catch(err => toastr.error(err.data))

		$http.get('api/create/players/').then(function(response){
			$scope.allPlayers = response.data
		})
		
	}	

	$http.get('api/create/players/').then(function(response){
		$scope.allPlayers = response.data
        console.log(response)
	})

	$scope.deletePlayer=function(playerId){
		$http.delete('api/players/' + playerId).then((response)=>{
			$scope.allPlayers = response.data
		})
	}

    $scope.editPlayer=function(player_edit){
		console.log(player_edit)
        $scope.visible_edit = true
        $scope.player_edit.id=player_edit._id
        $scope.player_edit.firstName =player_edit.firstName
        $scope.player_edit.secondName =player_edit.secondName
        $scope.player_edit.team =player_edit.team
    }

    $scope.cancelEditPlayer=function(){
        $scope.visible_edit = false
        $scope.player_edit = {}
    }

    $scope.saveEditPlayer=function(player_edit){
        $http.post("api/create/player/edit/" + player_edit.id , player_edit)
            .then (function(response){
                $scope.message=response.data
                $window.location.reload()
            })
            .catch(err => toastr.error(err.data))

        $http.get('api/create/players/').then(function(response){
            $scope.allPlayers = response.data

        })
    }

}])