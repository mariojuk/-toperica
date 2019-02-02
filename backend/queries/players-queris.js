var User = require('../models/User')

var deletePlayer = function(playerId){
	return User.findByIdAndUpdate(playerId, {$set : { isDeleted : true }},{new:true}).exec()
}

var getAllPlayers = function(){
	return User.find({function: 'player', isDeleted:false}).lean()
}
module.exports = {
    deletePlayer,
    getAllPlayers
}