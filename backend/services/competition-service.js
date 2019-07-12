const competionsQueris = require('../queries/competition-queris')

function todayCompetions(){
    return competionsQueris.getTodayCompetitions()
}

function todayCompetionsResults(competitionId){
    return competionsQueris.getTodayCompetitionsResults(competitionId)
}

function historyCompetitions(){
    return competionsQueris.getHistoryCompetitions()
}
module.exports = {
    todayCompetions,
    todayCompetionsResults,
    historyCompetitions
}