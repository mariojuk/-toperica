angular.module('loginCtrl', ['ngAnimate', 'toastr'])
.controller('loginController', ['$scope', '$location', '$http', 'toastr', '$state', function ($scope, $location, $http, toastr, $state){

	$scope.login = function(model){
		$http.post('api/login/authenticate', model).then(function(result) {
            window.localStorage.setItem('sportApp', result.data.token)
            isAuthenticated = true;
        	authToken = result.data.token
        	var currentUser = parseJwt(result.data.token)
        	$http.defaults.headers.common.Authorization = authToken
        	toastr.success('You are logged in as ' + currentUser.username)
            $state.go('home')
        }).catch(function(err){
        	toastr.error(err.data.msg)
        })
	}

	function parseJwt (token) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace('-', '+').replace('_', '/');
            return JSON.parse(window.atob(base64));
    }
}])