var mongoose = require('mongoose')

var Schema = mongoose.Schema
var CompetitionPlayerSchema = new Schema({
	refereeForThisPlayer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	competitionId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Competition' },
	player:{ type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	track1: { type: Object, default: { result:'/' }},
	track2: { type: Object, default: { result:'/' }},
	track3: { type: Object, default: { result:'/' }},
	parachute: {type: Object, default: { result:'/' }}
},{ timestamps: true })

module.exports = mongoose.model('CompetitionPlayer', CompetitionPlayerSchema)
