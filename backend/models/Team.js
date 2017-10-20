var mongoose = require('mongoose')

var Schema = mongoose.Schema
var teamSchema = new Schema({
	teamName: String,
	players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
	sport: String,
	teamOnePlayer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	teamOnePlayerResults: Object,
	teamTwoPlayer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	teamTwoPlayerResults: Object,
	teamThreePlayer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	teamThreePlayerResults: Object,
	refereeForThisTeam: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	registeredCompetition: { type: mongoose.Schema.Types.ObjectId, ref: 'Competition'}
},{ timestamps: true })

module.exports = mongoose.model('Team', teamSchema)
