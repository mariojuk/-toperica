angular.module('appRoutes', ['ngRoute'])
.config(function($routeProvider, $locationProvider){

	$routeProvider.when('/',{
		templateUrl: 'login/login.html',
		controller: 'loginController',
		css: './login/login.css'
	})

    $locationProvider.html5Mode(true)

})