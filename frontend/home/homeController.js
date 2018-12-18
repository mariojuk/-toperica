angular.module('SportApp')
.controller('homeController', ['$scope', '$location', '$http', 'toastr', 'AuthService', function ($scope, $location, $http, toastr, AuthService){

    $scope.user = AuthService.getCurrentUser(window.localStorage.getItem('sportApp')) //?
    $scope.myFunction = function(){
		  var x = document.getElementById("myAdminNav");
		  if (x.className === "adminNav") {
		    x.className += " responsive";
		  } else {
		    x.className = "adminNav";
		  }
	}
}])
