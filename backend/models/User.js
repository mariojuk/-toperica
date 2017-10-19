var mongoose = require('mongoose')

var Schema = mongoose.Schema
var UserSchema = new Schema({
	firstName: String,
	secondName: String,
	email: String,
	username: String,
	password: {
		type: String,
		select: false 
	},
	roles: {
		type: [{ type: String, enum: ['user', 'admin']}],
		default: ['user']
	},
	function: {
		type: [{ type: String, enum: ['player', 'referee']}]
	},
	sport: String
},{ timestamps: true })

module.exports = mongoose.model('User', UserSchema)
