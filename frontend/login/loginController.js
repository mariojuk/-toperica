angular.module('SportApp')
.controller('loginController', ['$scope', '$location', '$http', 'toastr', '$state', 'AuthService', '$sce', function ($scope, $location, $http, toastr, $state, AuthService,  $sce){

	

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


	$http.get('api/competition-results/today-competitions').then(function(response){
		$scope.todayComepetitions = response.data 
		$http.get('api/competition-results/today-competitions-results/' + $scope.todayComepetitions[0]._id).then(function(results){
			var html = "<table>"
			angular.forEach(results.data, function(value, key) {
				var sve = 0
				html += "<tr><td>" + key + "</td></tr>"
				html += "<th>Ime natjecatelja</th>" 
				html +="<th>Rezultat 1</th>"
				html +="<th>Rezultat 2</th>"
				html +="<th>Rezultat 3</th>"
				html +="<th>Ukupno</th>"
				html +="<th>SVE</th>"
				for (var i=0; i<value.length; i++) {
					sve += parseInt(value[i].track1.result + value[i].track2.result +value[i].track3.result)
					var message = ''
					message += "<tr>"
                    message += "<td>" +value[i].player.firstName + " " +value[i].player.secondName+ "</td>"
					message += "<td>" + value[i].track1.result + "</td>"
					message += "<td>" + value[i].track2.result + "</td>"
					message += "<td>" + value[i].track3.result + "</td>"
					message += "<td>" + parseInt(value[i].track1.result + value[i].track2.result +value[i].track3.result) + "</td>"
					message += "</tr>"
					html += message;
				}
				html += "<td>" + sve + "</td>"
			})
			html += "</table>";
			$scope.htmlReponse = $sce.trustAsHtml(html);
			
		})
	})
	
}])