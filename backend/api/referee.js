var express = require('express')
var router = express.Router()
var _=require('lodash')
var auth = require('../services/authServices')
var refereeQueries = require('../queries/referee-queries')
var startCompetitonQueries = require('../queries/start-competition-queries')

router
	.get('/myCompetitons', auth.ensure, function(req, res, next){
		refereeQueries.getMyCompetitions()
			.then(data=>{res.ok(data)})
	})

	.get('/myPlayersForCompetition', auth.ensure, function(req, res, next){
		startCompetitonQueries.getMeIsStartedCompetitions().then(competitons=>{
			refereeQueries.getMyPlayersForCompetition(req.user._id, competitons[0]._id)
			.then(data=>res.ok(data))
		})
	})
	
	.post('/write-result', auth.ensure, function(req, res, next){
		refereeQueries.writeResult(req.body)
			.then(data=>res.ok(data))
	})

module.exports = router