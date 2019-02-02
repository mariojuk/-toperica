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

var writeResult = async function(info){
	console.log(info)
	const playerResults = await CompetitionPlayer.find({
		player:info.player, 
		competitionId: info.competitionId
	}).select('track1 track2 track3').lean()

	if(	playerResults[0].track1.result != '/' && 
		playerResults[0].track2.result != '/' && 
		playerResults[0].track3.result != '/')
	{
		return Promise.reject('Nemate više pravo unosa rezultata za ovog igrača!')
	}

	if(playerResults[0].track1.result == '/') {
		return CompetitionPlayer.update({player:info.player, competitionId: info.competitionId}, { $set: { 'track1.result': info.result }}).exec()
	}else{
		if(playerResults[0].track2.result == '/') {
			return CompetitionPlayer.update({player:info.player, competitionId: info.competitionId}, { $set: { 'track2.result': info.result }}).exec()
		}else{
			if(playerResults[0].track3.result == '/') {
				return CompetitionPlayer.update({player:info.player, competitionId: info.competitionId}, { $set: { 'track3.result': info.result }}).exec()
			}
		}
	}

	

}

module.exports={
	getMyCompetitions,
	getMyPlayersForCompetition,
	writeResult
}