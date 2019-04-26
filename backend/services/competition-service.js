const competionsQueris = require('../queries/competition-queris')

function todayCompetions(){
    return competionsQueris.getTodayCompetitions()
}

function todayCompetionsResults(competitionId){
    return competionsQueris.getTodayCompetitionsResults(competitionId)
}
module.exports = {
    todayCompetions,
    todayCompetionsResults
}