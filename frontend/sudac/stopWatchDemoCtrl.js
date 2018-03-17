angular.module('SportApp')
.controller('stopWatchDemoCtrl', ['$scope', '$http', 'AuthService', '$timeout', function($scope,$http, AuthService, $timeout){
    $scope.stopwatches = [{ log: []}]
    $scope.categories=['traka', 'padobran']
    $scope.option = {
        name: 'track1'
    }

    $http.get('api/referee/myPlayersForCompetition').then(function(response){
        $scope.players = response.data
    })

    $scope.selectedPlayer=[]
    
    $scope.exist=function(item){
        return $scope.selectedPlayer.indexOf(item)> -1;
    }

    $scope.toggleSelection=function(item){
        var idx=$scope.selectedPlayer.indexOf(item._id)
        if(idx > -1){
            $scope.selectedPlayer.splice(idx,1);
        }
        else{
            $scope.selectedPlayer.push(item._id)
        }
    }

    $scope.counter = 0;
    var stopped;
  
    $scope.countdown = function() {
        stopped = $timeout(function() {
            $scope.counter++;   
            $scope.countdown();
            $scope.counterStarted = true   
        }, 1000);
      };
       
        
    $scope.stop = function(selectedCategory, option){
        var object={}
        console.log(option)
        object.selectedCategory = selectedCategory
        object.player = $scope.selectedPlayer[0]
        object.competitionId = $scope.players[0].competitionId
        object.result = $scope.counter
        $http.post('api/referee/write-result', object).then(function(response){
            $http.get('api/referee/myPlayersForCompetition').then(function(response){
                $scope.players = response.data
            })
        })

        $timeout.cancel(stopped)
    } 

    $scope.setToNull = function(){
        $timeout.cancel(stopped)
        $scope.counter = 0;
    } 

}])