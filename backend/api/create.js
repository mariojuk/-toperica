var express = require('express')
var router = express.Router()
var auth = require('../services/authServices')
var cq = require('../queries/createQueries')

var checkIsAdmin = function(req, res, next){
	var roles = req.user.roles
	if(roles == 'admin'){next()}
	else{res.status(400).json({err: 'You dont have permission !!!'})}
}

router
	.post('/referee', auth.ensure, checkIsAdmin, function(req, res, next){
  		cq.createReferee(req.body)
  			.then(data => res.ok(data))
			.catch(err => res.error(err))
	})

	.post('/player', auth.ensure, function(req, res, next){
  		cq.createPlayer(req.body)
  			.then(data => res.ok(data))
			.catch(err => res.error(err))
	})

	.post('/team', auth.ensure, function(req, res, next){
		if(req.body.players.length >1 && req.body.players.length <4){
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

	.post('/registrationOnCompetition/:competitionId/:teamId', auth.ensure, function(req, res, next){
		cq.regOnCompetition(req.params.competitionId, req.params.teamId)
			.then(data => res.ok(data))
			.catch(err => res.error(err))
	})

	.post('/teamResults/:teamId/:playerId', auth.ensure, function(req, res, next){
		cq.setPlayerResults(req.params.teamId, req.params.playerId, req.body.results)
			.then(data => res.ok(data))
			.catch(err => res.error(err))
	})

	.get('/players', auth.ensure, function(req, res, next){
		cq.getAllPlayers(req.query.sport)
			.then(data => res.ok(data))
			.catch(err => res.error(err))
	})

	.get('/referees', auth.ensure, function(req, res, next){
		cq.getAllReferees(req.query.sport)
			.then(data => res.ok(data))
			.catch(err => res.error(err))
	})

module.exports = router