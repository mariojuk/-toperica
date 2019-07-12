const express = require('express')
const router = express.Router()
const competitionService = require('../services/competition-service')
const Team = require('../models/Team')
const _ = require('lodash')

router
    .get('/today-competitions', function(req, res, next){
        competitionService.todayCompetions().then(data=>{
            res.ok(data)
        }).catch(err => res.error(err))

    })
    .get('/history-competitions', (req, res, next)=>{
        competitionService.historyCompetitions().then(data=>{
            res.ok(data)
        }).catch(err => res.error(err))

    })
    .get('/today-competitions-results/:competitionid', function(req, res, next){
        competitionService.todayCompetionsResults(req.params.competitionid).then(data=>{
            var counter = 0
            var newcounter = 0
            var niz = []
            data.forEach(data2 => {
                Team.find({$and:[
                        {$or: [
                                {teamOnePlayer: data2.player._id },
                                {teamTwoPlayer: data2.player._id },
                                {teamThreePlayer: data2.player._id }
                            ]}
                        ,{registeredCompetition: {$in: [req.params.competitionid]}}
                    ]}).then(team=>{
                    counter ++
                    data2.team = team[0].teamName
                    if (counter == data.length){
                        data = _.sortBy( data, 'team' )
                        niz = _.groupBy(data, "team")
                        res.ok(niz)
                    }
                })
            })

        }).catch(err => res.error(err))
    })

    .get('/history-competitions-results/:competitionid', function(req, res, next){
        competitionService.todayCompetionsResults(req.params.competitionid).then(data=>{
            var counter = 0
            var newcounter = 0
            var niz = []
            data.forEach(data2 => {
                Team.find({$and:[
                        {$or: [
                                {teamOnePlayer: data2.player._id },
                                {teamTwoPlayer: data2.player._id },
                                {teamThreePlayer: data2.player._id }
                            ]}
                        ,{registeredCompetition: {$in: [req.params.competitionid]}}
                    ]}).then(team=>{
                    counter ++
                    data2.team = team[0].teamName
                    if (counter == data.length){
                        data = _.sortBy( data, 'team' )
                        niz = _.groupBy(data, "team")
                        res.ok(niz)
                    }
                })
            })

        }).catch(err => res.error(err))
    })

module.exports = router