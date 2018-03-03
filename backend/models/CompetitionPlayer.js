var mongoose = require('mongoose')

var Schema = mongoose.Schema
var CompetitionPlayerSchema = new Schema({
	refereeForThisPlayer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	competitionId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Competition' },
	player:{ type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	track: Object,
	parachute: Object
},{ timestamps: true })

module.exports = mongoose.model('CompetitionPlayer', CompetitionPlayerSchema)
