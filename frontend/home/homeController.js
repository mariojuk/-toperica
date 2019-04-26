angular.module('SportApp')
.controller('homeController', ['$scope', '$location', '$http', 'toastr', 'AuthService', '$state', function ($scope, $location, $http, toastr, AuthService, $state){

    $scope.user = AuthService.getCurrentUser(window.localStorage.getItem('sportApp')) //?
    $scope.myFunction = function(){
		  var x = document.getElementById("myAdminNav");
		  if (x.className === "adminNav") {
		    x.className += " responsive";
		  } else {
		    x.className = "adminNav";
		  }
	}

		$scope.odjava = function(){
				AuthService.logout()
				$state.go('login')
		}
}])
