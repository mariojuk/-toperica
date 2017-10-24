angular.module('homeCtrl', ['ngAnimate', 'toastr'])
.controller('homeController', ['$scope', '$location', '$http', 'toastr', 'AuthService', function ($scope, $location, $http, toastr, AuthService){

    $scope.user = AuthService.getCurrentUser(window.localStorage.getItem('sportApp'))
    
    $http.get('api/create/referees?sport=Tennis').then(function(result){
    }).catch(function(err){
        toastr.error('You are logged in but ' + err.data.err + ' for get Tennis referees')
    })

    $scope.get = function(){
        $http.get('api/create/competitionInfo/59e9f75df76d2c28907a3283').then(function(result){
            $scope.competition = result.data
        }).catch(function(err){
            toastr.error('You are logged in but ' + err.data.err + ' for get Tennis referees')
        })
    }
}])