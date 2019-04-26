const Competition = require('../models/Competition')
const CompetitionPlayer = require('../models/CompetitionPlayer')
const moment = require('moment')

var playerpopulate = [
	{path:'player', select: 'firstName secondName club'}
]

function getTodayCompetitions() {
    const start = moment().format('YYYY-MM-DD')
    return Competition.find({
        competitionStart: start + ' 22:00:00.000Z'
      })
}

function getTodayCompetitionsResults(competitionId) {
    return CompetitionPlayer.find({competitionId: competitionId}).populate(playerpopulate).lean()
}

module.exports = {
    getTodayCompetitions,
    getTodayCompetitionsResults
}