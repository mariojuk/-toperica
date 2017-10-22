angular.module('appRoutes', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider, $locationProvider){

	 $urlRouterProvider.otherwise("/")
	 $locationProvider.html5Mode(true)

  	$stateProvider
    	.state('login', {
      		url: "/",
      		templateUrl: "login/login.html",
      		controller: "loginController"
    	})

    	.state('home', {
      		url: "/create",
      		templateUrl: "home/home.html",
      		controller: "homeController"
    	})
})