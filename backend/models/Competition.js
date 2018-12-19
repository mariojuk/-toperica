var mongoose = require('mongoose')

var Schema = mongoose.Schema
var competitionSchema = new Schema({
	reportedTeams: [{type: mongoose.Schema.Types.ObjectId, ref: 'Team'}],
	description: String,
	competitionName:String,
	competitionStart: Date,
	competitionLocation: String,
	chiefReferee: String,
	isStarted:{type: Boolean, default:false}
},{ timestamps: true })

module.exports = mongoose.model('Competition', competitionSchema)
