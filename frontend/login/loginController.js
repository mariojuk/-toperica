angular.module('SportApp')
.controller('loginController', ['$scope', '$location', '$http', 'toastr', '$state', 'AuthService', '$sce', '$timeout' , function ($scope, $location, $http, toastr, $state, AuthService,  $sce, $timeout){

    $scope.startDescription = true
    $http.get('api/create/findCompetitions').then(function(response){
        $scope.findCompetitions = response.data
        console.log(response.data)
    })
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

            $scope.todayComepetitions = response.data

            if($scope.todayComepetitions[0]._id == undefined){
                $scope.todaysLocation = false
                $scope.rezDescription = false

            }else {
                $scope.todaysLocation = true
                $scope.rezDescription = true
                $scope.startDescription = false

            }
			var html = "<div class='rezultatLive'>"


			angular.forEach(results.data, function(value, key) {
				var sve = 0
                html += "<div class='rezultatContent'>"
				html += "<div class='clabname'>" + key + "</div>"
				html += "<div class='description'>Ime natjecatelja</div>"
				html +="<div class='description'>Rezultat 1</div>"
				html +="<div class='description'>Rezultat 2</div>"
				html +="<div class='description'>Rezultat 3</div>"
				html +="<div class='description'>Ukupno</div>"
                html +="<div class='descriptionAll'>SVE</div>"

				for (var i=0; i<value.length; i++) {
                    rez1 = value[i].track1.result == "/" ? 0 : value[i].track1.result
                    rez2 = value[i].track2.result == "/" ? 0 : value[i].track2.result
                    rez3 = value[i].track3.result == "/" ? 0 : value[i].track3.result
                    sve += parseInt(rez1+rez2+rez3)
					var message = ''
                    message += "<div class='datalist'>"
                    message += "<div class='descriptionRez'>" +value[i].player.firstName + " " +value[i].player.secondName+ "</div>"
                    if(value[i].track1.result == "/"){
                        message += "<div class='descriptionRez'>" + 0+ "</div>"
                        value[i].track1.result = 0
                    }else{
                        message += "<div class='descriptionRez'>" + value[i].track1.result + "</div>"
                    }
                    if(value[i].track2.result == "/"){
                        message += "<div class='descriptionRez'>" + 0 + "</div>"
                        value[i].track2.result = 0
                    }else{
                        message += "<div class='descriptionRez'>" + value[i].track2.result + "</div>"
                    }
                    if(value[i].track3.result == "/"){
                        message += "<div class='descriptionRez'>" + 0 + "</div>"
                        value[i].track3.result = 0
                    }else{
                        message += "<div class='descriptionRez'>" + value[i].track3.result + "</div>"
                    }
					message += "<div class='descriptionRez' >" + parseInt(value[i].track1.result + value[i].track2.result +value[i].track3.result) + "</div>"
					message += "</div>"
					html += message;
				}
                html += "<div class='allRez'>" + sve + "</div>"
                html += "</div>"
                html += "<div>"
                html += "</div>"
			})
			html += "</div>";
			$scope.traka = $sce.trustAsHtml(html);



            var html2 = "<div class='rezultatLive'>"
            angular.forEach(results.data, function(value, key) {
                var sve = 0
                for (var i=0; i<value.length; i++) {
                    rez1 = value[i].parachute1.result == "/" ? 0 : value[i].parachute1.result
                    rez2 = value[i].parachute2.result == "/" ? 0 : value[i].parachute2.result
                    rez3 = value[i].parachute3.result == "/" ? 0 : value[i].parachute3.result
                    sve += parseInt(rez1+rez2+rez3)
                    console.log(sve)
                    var all = new Array();
                    console.log(all)
                    all[i]=sve;

                    console.log(all)
                }

                html2 += "<div class='rezultatContent'>"
                html2 += "<div class='clabname'>" + key + "</div>"
                html2 += "<div class='description'>Ime natjecatelja</div>"
                html2 +="<div class='description'>Rezultat 1</div>"
                html2 +="<div class='description'>Rezultat 2</div>"
                html2 +="<div class='description'>Rezultat 3</div>"
                html2 +="<div class='description'>Ukupno</div>"
                html2 +="<div class='descriptionAll'>SVE</div>"

                for (var i=0; i<value.length; i++) {

                    rez1 = value[i].parachute1.result == "/" ? 0 : value[i].parachute1.result
                    rez2 = value[i].parachute2.result == "/" ? 0 : value[i].parachute2.result
                    rez3 = value[i].parachute3.result == "/" ? 0 : value[i].parachute3.result
                    sve += parseInt(rez1+rez2+rez3)


                    var message = ''
                    message += "<div class='datalist'>"
                    message += "<div class='descriptionRez'>" +value[i].player.firstName + " " +value[i].player.secondName+ "</div>"
                    if(value[i].parachute1.result == "/"){
                        message += "<div class='descriptionRez'>" + 0+ "</div>"
                        value[i].parachute1.result = 0
                    }else{
                        message += "<div class='descriptionRez'>" + value[i].parachute1.result + "</div>"
                    }
                    if(value[i].parachute2.result == "/"){
                        message += "<div class='descriptionRez'>" + 0 + "</div>"
                        value[i].parachute2.result = 0
                    }else{
                        message += "<div class='descriptionRez'>" + value[i].parachute2.result + "</div>"
                    }
                    if(value[i].parachute3.result == "/"){
                        message += "<div class='descriptionRez'>" + 0 + "</div>"
                        value[i].parachute3.result = 0
                    }else{
                        message += "<div class='descriptionRez'>" + value[i].parachute3.result + "</div>"
                    }
                    message += "<div class='descriptionRez' >" + parseInt(value[i].parachute1.result + value[i].parachute2.result +value[i].parachute3.result) + "</div>"
                    message += "</div>"
                    html2 += message;
                }
                html2 += "<div class='allRez'>" + sve + "</div>"
                html2 += "</div>"
                html2 += "<div>"
                html2 += "</div>"
            })
            html2 += "</div>";
            $scope.padobran = $sce.trustAsHtml(html2);


		})
	})

        var slidesInSlideshow = 3;
        var slidesTimeIntervalInMs = 3000;

        $scope.slideshow = 1;
        var slideTimer =
            $timeout(function interval() {
                $scope.slideshow = ($scope.slideshow % slidesInSlideshow) + 1;
                slideTimer = $timeout(interval, slidesTimeIntervalInMs);
            }, slidesTimeIntervalInMs);
}])