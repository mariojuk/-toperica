var CompetitionPlayer = require('../models/CompetitionPlayer')
var Competition = require('../models/Competition')

var getMyCompetitions = function(refereeId){
	return Competition.find({isStarted:true}).lean()
}

var getMyPlayersForCompetition = function(refereeId, competitionId){
	return CompetitionPlayer.find({refereeForThisPlayer: refereeId, competitionId: competitionId})
		.populate({path:'player', select:'firstName secondName club track1 track2 track3'})
		.lean()
}

var writeResult = function(info){
	return CompetitionPlayer.update({player:info.player, competitionId: info.competitionId}, { $set: { 'track1.result': info.result }}).exec()
}

module.exports={
	getMyCompetitions,
	getMyPlayersForCompetition,
	writeResult
}