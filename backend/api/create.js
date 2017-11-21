var express = require('express')
var router = express.Router()
var _=require('lodash')
var auth = require('../services/authServices')
var cq = require('../queries/createQueries')

var checkIsAdmin = function(req, res, next){
	var roles = req.user.roles
	if(roles == 'admin'){next()}
	else{res.status(400).json({err: 'You dont have permission '})}
}

router
	.post('/referee', auth.ensure, checkIsAdmin, function(req, res, next){
  		cq.createReferee(req.body)
  			.then(data => res.ok(data))
			.catch(err => res.error(err))
	})

	.post('/player', auth.ensure, checkIsAdmin, function(req, res, next){
		
		if(!_.isEmpty(req.body)){
			if(req.body.firstName != undefined && req.body.secondName != undefined){
				cq.createPlayer(req.body)
	  			.then(data => res.ok(data))
				.catch(err => res.error(err))
			}else{
				res.error('input firstName or secondName')
			}
		}else{
			res.error('input firstName and secondName')
		}
  		
	})

	.post('/team', auth.ensure, checkIsAdmin, function(req, res, next){
		if(req.body.players.length >0 && req.body.players.length <4){
			cq.createTeam(req.body)
  			.then(data => res.ok(data))
			.catch(err => res.error(err))
		}else{
			res.error('Minimum players for One Team is 1 and Maximum players for One Team is 3')
		}
  		
	})

	.post('/competition', auth.ensure, checkIsAdmin, function(req, res, next){
  		cq.createCompetition(req.body)
  			.then(data => res.ok(data))
			.catch(err => res.error(err))
	})

	.get('/competitionInfo/:id', auth.ensure, function(req, res, next){
		cq.getCompetitionInfo(req.params.id)
			.then(data => res.ok(data))
			.catch(err => res.error(err))
	})

	.get('/teamInfo/:id', auth.ensure, function(req, res, next){
		cq.getTeamInfo(req.params.id)
			.then(data => res.ok(data))
			.catch(err => res.error(err))
	})

	.get('/findTeam/:teamName', auth.ensure, function(req, res, next){
		if(req.params.teamName.toString() != "undefined"){
			cq.findTeam(req.params.teamName)
			.then(data => res.ok(data))
			.catch(err => res.error(err))
		}else{
			res.error("Upiši ime tima")
		}
		
	})

	.get('/findCompetitions', auth.ensure, function(req, res, next){
		cq.findCompetitions()
			.then(data => res.ok(data))
			.catch(err => res.error(err))
	})

	.post('/registrationOnCompetition/:competitionId/:teamId', auth.ensure, checkIsAdmin, function(req, res, next){
		console.log(req.params.competitionId, req.params.teamId)
		cq.regOnCompetition(req.params.competitionId, req.params.teamId)
			.then(data => res.ok(data))
			.catch(err => res.error(err))
	})

	.post('/teamResults/:teamId/:playerId', auth.ensure, function(req, res, next){
		cq.setPlayerResults(req.params.teamId, req.params.playerId, req.body.results)
			.then(data => res.ok(data))
			.catch(err => res.error(err))
	})

	.get('/players', auth.ensure, checkIsAdmin, function(req, res, next){
		cq.getAllPlayers(req.query.sport)
			.then(data => res.ok(data))
			.catch(err => res.error(err))
	})

	.get('/specificPlayers/:playerName', auth.ensure, checkIsAdmin, function(req, res, next){
		cq.getSpecificPlayers(req.params.playerName)
			.then(data => res.ok(data))
			.catch(err => res.error(err))
	})

	.get('/referees/:refereeName', auth.ensure, checkIsAdmin, function(req, res, next){
		cq.getAllReferees(req.params.refereeName)
			.then(data => res.ok(data))
			.catch(err => res.error(err))
	})

	.get('/referees', auth.ensure, checkIsAdmin, function(req, res, next){
		cq.getAllReferee()
			.then(data => res.ok(data))
			.catch(err => res.error(err))
	})

module.exports = router