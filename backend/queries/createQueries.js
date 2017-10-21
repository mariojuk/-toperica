var Competition = require('../models/Competition')
var User = require('../models/User')
var Team = require('../models/Team')

var competitionpopulate = [
	{path: 'reportedTeams', select: 'teamName players',
    populate: { path: 'players', select: 'firstName secondName' }
  	}
]

var teampopulate = [
	{path:'players', select: 'firstName secondName'},
	{path:'teamOnePlayer', select: 'firstName secondName'},
	{path:'teamTwoPlayer', select: 'firstName secondName'},
	{path:'teamThreePlayer', select: 'firstName secondName'},
	{path: 'registeredCompetition', select: 'description competitionStart competitionLocation weather'}
]

var createCompetition= function(competition){
	var competition = new Competition({
		description: competition.description,
		competitionStart: competition.competitionStart,
		competitionLocation: competition.competitionLocation,
		sport: competition.sport,
		weather: competition.weather,
	})

	return competition.save()
}

var createReferee = function(referee){
	var username = referee.firstName + referee.secondName
	var referee = new User({
		firstName: referee.firstName,
		secondName: referee.secondName,
		email: referee.email,
		username: username,
		password: '12345678',
		function: 'referee',
		sport: referee.sport
	})

	return referee.save()
}

var createPlayer = function(player){
	var player = new User({
		firstName: player.firstName,
		secondName: player.secondName,
		function: 'player',
		sport: player.sport
	})

	return player.save()
}

var createTeam = function(team){
	var team = new Team({
		teamName: team.teamName,
		players: team.players,
		teamOnePlayer: team.players[0],
		teamTwoPlayer: team.players[1],
		teamThreePlayer: team.players[2],
		sport: team.sport,
	})

	return team.save()
}

var getAllPlayers = function(sport){
	return User.find({sport: sport, function: 'player'}).lean()
}

var getAllReferees= function(sport){
	return User.find({sport: sport, function: 'referee'}).lean()
}

var getCompetitionInfo = function(competitionId){
	return Competition.findById(competitionId)
		.populate(competitionpopulate)
		.lean()
}

var getTeamInfo = function(teamId){
	return Team.findById(teamId)
		.populate(teampopulate)
		.lean()
}

var regOnCompetition = function(competitionId, teamId){
	return Competition.findByIdAndUpdate(competitionId, {$addToSet: {reportedTeams: teamId}}, {new:true}).then(function(competition){
		return Team.findByIdAndUpdate(teamId, {$addToSet: {registeredCompetition: competitionId}},{new:true})
	})
}

var setPlayerResults = function(teamId, playerId, results){
	return Team.findById(teamId).then(function(team){
		if(team.teamOnePlayer.toString() == playerId.toString()){
			return Team.findByIdAndUpdate(teamId, {$set: {teamOnePlayerResults: results}},{new:true})
		}
		if(team.teamTwoPlayer.toString() == playerId.toString()){
			return Team.findByIdAndUpdate(teamId, {$set: {teamTwoPlayerResults: results}},{new:true})
		}
		if(team.teamThreePlayer.toString() == playerId.toString()){
			return Team.findByIdAndUpdate(teamId, {$set: {teamThreePlayerResults: results}},{new:true})
		}
	})
}

module.exports = {
	createCompetition,
	createReferee,
	createPlayer,
	createTeam,
	getAllPlayers,
	getCompetitionInfo,
	getTeamInfo,
	getAllReferees,
	regOnCompetition,
	setPlayerResults
}