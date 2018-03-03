var CompetitionPlayer = require('../models/CompetitionPlayer')

var givePlayersReferees = function(player, referee, competitionId){
	var competitionPlayer = new CompetitionPlayer({
		refereeForThisPlayer: referee,
		competitionId: competitionId,
		player: player
	})

	return competitionPlayer.save()
}

module.exports={
	givePlayersReferees
}