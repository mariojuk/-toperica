angular.module('SportApp')
.controller('stopWatchDemoCtrl', ['$scope', '$http', 'AuthService', '$timeout','toastr', '$state' , function($scope,$http, AuthService, $timeout, toastr, $state){
    $scope.user = AuthService.getCurrentUser(window.localStorage.getItem('sportApp'))
    $scope.odjava = function(){
        AuthService.logout()
        $state.go('login')
    }

    $scope.stopwatches = [{ log: []}]
    $scope.categories=['traka', 'padobran']
    $scope.option = {
        name: 'track1'
    }

    $http.get('api/referee/myPlayersForCompetition').then(function(response){
        $scope.players = response.data
    })

    $scope.checkCategoryAndGenerateTable = function(selectedCategory) {
        if(selectedCategory == 'padobran'){
            $scope.selektiranPadobran = true;
        }else{
            $scope.selektiranPadobran = false;
        }
    }

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
        object.selectedCategory = selectedCategory
        object.player = $scope.selectedPlayer[0]
        object.competitionId = $scope.players[0].competitionId
        object.result = $scope.counter
        $scope.counterStarted = false 
        $scope.counter = 0
        $http.post('api/referee/write-result', object).then(function(response){
            $http.get('api/referee/myPlayersForCompetition').then(function(response){
                $scope.players = response.data
                $scope.selectedPlayer=[]
            })
        }).catch(err => toastr.error(err.data))

        $timeout.cancel(stopped)
    } 

    $scope.setToNull = function(selectedCategory, option){
        var object={}
        object.selectedCategory = selectedCategory
        object.player = $scope.selectedPlayer[0]
        object.competitionId = $scope.players[0].competitionId
        object.result = 0
        $scope.counterStarted = false 
        $scope.counter = 0
        $http.post('api/referee/write-result', object).then(function(response){
            $http.get('api/referee/myPlayersForCompetition').then(function(response){
                $scope.players = response.data
                $scope.selectedPlayer=[]
            })
        }).catch(err => toastr.error(err.data))

        $timeout.cancel(stopped)
    } 

}])