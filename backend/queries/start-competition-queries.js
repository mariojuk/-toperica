var CompetitionPlayer = require('../models/CompetitionPlayer')
var Competition = require('../models/Competition')
var moment = require('moment')

var givePlayersReferees = function(player, referee, competitionId){
	var competitionPlayer = new CompetitionPlayer({
		refereeForThisPlayer: referee,
		competitionId: competitionId,
		player: player
	})

	return competitionPlayer.save()
}

var startNewCompetiton = function(competitionId){
	return Competition.findByIdAndUpdate(competitionId, {$set : { isStarted : true }},{new:true}).exec()
}

var getMeIsStartedCompetitions = function(){
	var oneDaysAgo = moment().subtract(1,'d').format('YYYY-MM-DD')
	return Competition.find({isStarted: true, competitionStart: {$gt: oneDaysAgo}}).lean()
}

module.exports={
	givePlayersReferees,
	startNewCompetiton,
	getMeIsStartedCompetitions
}