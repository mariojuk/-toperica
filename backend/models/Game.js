var mongoose = require('mongoose')

var Schema = mongoose.Schema
var gameSchema = new Schema({
	teamOnePlayers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
	teamTwoPlayers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
	referee: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	gameStart: String,
	gameLocation: String,
	sport: String,
	weather: String,
	finalScore: Array
},{ timestamps: true })

module.exports = mongoose.model('Game', gameSchema)
