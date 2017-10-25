angular.module('homeCtrl', ['ngAnimate', 'toastr'])
.controller('homeController', ['$scope', '$location', '$http', 'toastr', 'AuthService', function ($scope, $location, $http, toastr, AuthService){

    $scope.user = AuthService.getCurrentUser(window.localStorage.getItem('sportApp'))
    
}])