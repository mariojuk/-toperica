var Game = require('../models/Game')
var User = require('../models/User')

var gamepopulate = [
	{path: 'referee', select: 'firstName secondName email'},
	{path:'teamOnePlayers', select: 'firstName secondName'},
	{path:'teamTwoPlayers', select: 'firstName secondName'},
]


var createGame = function(game){
	var game = new Game({
		teamOnePlayers: game.teamOne,
		teamTwoPlayers: game.teamTwo,
		referee: game.referee,
		gameStart: game.gameStart,
		gameLocation: game.gameLocation,
		sport: game.sport,
		weather: game.weather
	})

	return game.save()
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

var getAllPlayers = function(sport){
	return User.find({sport: sport, function: 'player'}).lean()
}

var getAllReferees= function(sport){
	return User.find({sport: sport, function: 'referee'}).lean()
}

var getGameInfo = function(gameId){
	return Game.findById(gameId)
		.populate(gamepopulate)
		.lean()
}

var updateFinalScore = function(gameId, finalScore){
	return Game.findByIdAndUpdate(gameId,{ $push: { finalScore: { $each: finalScore } } }, {new:true}).lean()
}

module.exports = {
	createGame,
	createReferee,
	createPlayer,
	getAllPlayers,
	getGameInfo,
	getAllReferees,
	updateFinalScore
}