var express = require('express')
var router = express.Router()
var _=require('lodash')
var auth = require('../services/authServices')
var startCompetitonQueries = require('../queries/start-competition-queries')

var checkIsAdmin = function(req, res, next){
	var roles = req.user.roles
	if(roles == 'admin'){next()}
	else{res.status(400).json({err: 'You dont have permission '})}
}

router
	.post('/givePlayersReferees', auth.ensure, checkIsAdmin, function(req, res, next){
  		req.body.players.forEach(player=>{
  			startCompetitonQueries.givePlayersReferees(player, req.body.referee, req.body.competitionId)
  		})
  		res.ok()
	})
module.exports = router