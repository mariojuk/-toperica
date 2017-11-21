angular.module('loginCtrl', ['ngAnimate', 'toastr'])
.controller('loginController', ['$scope', '$location', '$http', 'toastr', '$state', 'AuthService', function ($scope, $location, $http, toastr, $state, AuthService){

	$scope.login = function(model){
        AuthService.login(model)
            .then(function(res){
            	var user = AuthService.getCurrentUser(window.localStorage.getItem('sportApp'))
            	
            	if(user.roles == "admin"){
            		toastr.success('You are logged in as ' + user.username)
               		$state.go('home')
            	}else{
            		$state.go('sudac')
            		toastr.success('You are logged in as ' + user.username)
            	}

               
            })
            .catch(err => toastr.error(err.data.msg))
	}

}])