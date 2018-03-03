var mongoose = require('mongoose')

var Schema = mongoose.Schema
var CompetitionPlayerSchema = new Schema({
	refereeForThisPlayer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	competitionName:{ type: mongoose.Schema.Types.ObjectId, ref: 'Competition' },
	player:{ type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	result:Object

},{ timestamps: true })

module.exports = mongoose.model('CompetitionPlayer', CompetitionPlayerSchema)
