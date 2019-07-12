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
		  
      .state('sudac', {
          url: "/sudac",
          templateUrl: "sudac/sudac.html",
          controller: "stopWatchDemoCtrl"
      })
		
      .state('home.kreirajTim', {
          url: '^/create/kreirajTim',
            views: {
              'adminPanel@home': {
                templateUrl: 'home/kreirajTim/kreirajTim.html',
                controller: 'kreirajTimController'
              }
            }
      })

      .state('home.kreirajNatjecatelja', {
          url: '^/create/kreirajNatjecatelja',
            views: {
              'adminPanel@home': {
                templateUrl: 'home/kreirajNatjecatelja/kreirajNatjecatelja.html',
                controller: 'kreirajNatjecateljaController'
              }
            }
      })

      .state('home.kreirajSudca', {
          url: '^/create/kreirajSudca',
              views: {
                'adminPanel@home': {
                  templateUrl: 'home/kreirajSudca/kreirajSudca.html',
                  controller: 'kreirajSudcaController'
              }
          }
      })

      .state('home.zapocniNatjecanje', {
          url: '^/create/zapocniNatjecanje',
              views: {
                'adminPanel@home': {
                  templateUrl: 'home/zapocniNatjecanje/zapocniNatjecanje.html',
                  controller: 'zapocniNatjecanjeController'
              }
          }
      })

      .state('home.prijavaTima', {
          url: '^/create/prijavaTima',
            views: {
              'adminPanel@home': {
                templateUrl: 'home/prijavaTima/prijavaTima.html',
                controller: 'prijavaTimaController'
              }
            }
        })
              
      .state('home.kreirajNatjecanje', {
          url: '^/create/kreirajNatjecanje',
            views: {
              'adminPanel@home': {
                templateUrl: 'home/kreirajNatjecanje/kreirajNatjecanje.html',
                controller: 'kreirajNatjecanjeController'
              }
            }
        })
        .state('about-us', {
            url: "/about-us",
            templateUrl: "about-us/about-us.html",
            controller: "about-usController"
        })
        .state('history-of-competition', {
            url: "/history-of-competition",
            templateUrl: "history-of-competition/history-of-competition.html",
            controller: "historyOfCompetitionController"
        })
     
})