angular.module('SportApp')
    .controller('historyOfCompetitionController', ['$scope', '$location', '$http', 'toastr', '$state', 'AuthService', '$sce', '$timeout' , function ($scope, $location, $http, toastr, $state, AuthService,  $sce, $timeout){


        $http.get('api/competition-results/history-competitions').then(function(response){
            console.log(response.data)
        })

        $scope.giveMeCompetitionInfo=function(competitionId){

            $http.get("api/competition-results/history-competitions-results/" + competitionId) .then (function(response){
                var html = "<div class='rezultatLive'>"
                angular.forEach(response.data, function(value, key) {
                    var sve = 0
                    html += "<div class='rezultatContent'>"
                    html += "<div class='clabname'>" + key + "</div>"
                    html += "<div class='description'>Ime natjecatelja</div>"
                    html +="<div class='description'>Rezultat 1</div>"
                    html +="<div class='description'>Rezultat 2</div>"
                    html +="<div class='description'>Rezultat 3</div>"
                    html +="<div class='description'>Ukupno</div>"

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
                    html += "</div>"
                    html += "<div>"
                    html +="<div class='descriptionAll'>SVE</div>"
                    html += "<div class='allRez'>" + sve + "</div>"
                    html += "</div>"
                })
                html += "</div>";
                $scope.traka = $sce.trustAsHtml(html);
            })
        }


    }])