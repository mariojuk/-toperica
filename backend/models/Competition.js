var mongoose = require('mongoose')
//mongo db
var Schema = mongoose.Schema
var competitionSchema = new Schema({
	reportedTeams: [{type: mongoose.Schema.Types.ObjectId, ref: 'Team'}], //niz prijavljenih timova
	description: String,
	competitionName:String,
	competitionStart: Date,
	competitionLocation: String,
	chiefReferee: String,
	isStarted:{type: Boolean, default:false}
},{ timestamps: true })

module.exports = mongoose.model('Competition', competitionSchema)
