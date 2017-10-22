angular.module('homeCtrl', ['ngAnimate', 'toastr'])
.controller('homeController', ['$scope', '$location', '$http', 'toastr', function ($scope, $location, $http, toastr){

    var authToken = window.localStorage.getItem('sportApp')
    var currentUser = parseJwt(authToken)
    $http.defaults.headers.common.Authorization = authToken
    
    $http.get('api/create/referees?sport=Tennis').then(function(result){
        console.log(result)
    }).catch(function(err){
        console.log(err)
        toastr.error('You are logged in but ' + err.data.err + ' for get Tennis referees')
    })

    function parseJwt (token) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace('-', '+').replace('_', '/');
            return JSON.parse(window.atob(base64));
    }
}])