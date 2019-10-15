const express = require("express");
const router = express.Router();

const User = require("../model/user");
const Game = require("../model/game");

router.get("/easy", (req, res) => {    
    Promise.resolve(Game.generate()).then(function(value) {
        var data = JSON.stringify(value);
        res.render('GameEasy', {
            object: data
        }); 
    });
})
router.get("/medium", (req, res) => {
    Promise.resolve(Game.generate()).then(function(value) {
        var data = JSON.stringify(value);
        res.render('GameMedium', {
            object: data
        }); 
    });
})
router.get("/hard", (req, res) => {
    Promise.resolve(Game.generate()).then(function(value) {
        var data = JSON.stringify(value);
        res.render('GameHard', {
            object: data
        }); 
    });
})
router.post("/endGame", (req, res) => {
    if(req.session.username != 'guest') {
        Promise.resolve(User.getUser(req.session.username)).then(function(value) {            
            Game.submitData(value[0].idusers, req.body.wpm, req.body.time, req.body.acc, req.body.diff);
            User.updateGamePlayed(value[0].idusers);
        })
    }
})

module.exports = router;