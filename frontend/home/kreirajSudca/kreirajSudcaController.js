angular.module('SportApp')
.controller('kreirajSudcaController', ['$scope', '$location', '$http', 'toastr', 'AuthService','$window', function ($scope, $location, $http, toastr, AuthService,$window){
	
	$scope.showm = true
    $scope.visible_edit = false
    $scope.referee_edit = {}

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

    $scope.deleteReferee=function(refereeId){
        $http.delete('api/referee/' + refereeId).then((response)=>{
            $scope.allPlayers = response.data
        })
    }

    $scope.editReferee=function(referee){
        $scope.visible_edit = true
        $scope.referee_edit.id=referee._id
        $scope.referee_edit.firstName =referee.firstName
        $scope.referee_edit.secondName =referee.secondName
        $scope.referee_edit.club =referee.club
    }

    $scope.cancelEditReferee=function(){
        $scope.visible_edit = false
        $scope.player_edit = {}
    }

    $scope.saveEditReferee=function(referee_edit){
		console.log(referee_edit)
        $http.post("api/referee/edit/" + referee_edit.id , referee_edit)
            .then (function(response){
                $scope.message=response.data
                $window.location.reload()
            })
            .catch(err => toastr.error(err.data))

        $http.get('api/create/referees').then(function(response){
            $scope.getAllReferee = response.data
        })
    }



}])
