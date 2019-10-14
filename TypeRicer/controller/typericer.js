const express = require("express");
const router = express.Router();

const User = require("../model/user");
const Game = require("../model/game"); 

router.get("/", (req, res) => {
    if(req.cookies) {
        if(req.session.username || req.cookies.username) {
            res.render('Home');
        } else {
            Promise.resolve(User.getAllUser()).then(function(value) {
                res.render('Login', {
                    object : JSON.stringify(value)
                });
            })
        }
    } else {
        Promise.resolve(User.getAllUser()).then(function(value) {
            res.render('Login', {
                object : JSON.stringify(value)
            });
        })
    }
})
router.get("/difficulty", (req, res) => {
    res.render('Difficulty');
})
router.get("/profile", (req, res) => {
    if(req.session.username != 'guest' && req.cookies.username) {
        Promise.resolve(User.getUser(req.cookies.username)).then(function(profile) {
            Promise.resolve(User.getEasy(req.cookies.username)).then(function(easy) {
                Promise.resolve(User.getMedium(req.cookies.username)).then(function(medium) {
                    Promise.resolve(User.getHard(req.cookies.username)).then(function(hard) {
                        Promise.resolve(User.getEasyGame(profile[0].idusers)).then(function(easyGame) {
                            Promise.resolve(User.getMediumGame(profile[0].idusers)).then(function(mediumGame) {
                                Promise.resolve(User.getHardGame(profile[0].idusers)).then(function(hardGame) {
                                    var data = [], games = [];
                                    data.push(profile);
                                    data.push(easy);
                                    data.push(medium);
                                    data.push(hard);
                                    games.push(easyGame);
                                    games.push(mediumGame);
                                    games.push(hardGame);
                                    res.render('Profile', {
                                        name : profile[0].username,
                                        game : JSON.stringify(games),
                                        object : JSON.stringify(data)
                                    });
                                })
                            })  
                        })
                    })
                })
            })
        })
    } else if(req.session.username == 'guest') {
        Promise.resolve(User.getUser(req.session.username)).then(function(profile) {
            Promise.resolve(User.getEasy(req.session.username)).then(function(easy) {
                Promise.resolve(User.getMedium(req.session.username)).then(function(medium) {
                    Promise.resolve(User.getHard(req.session.username)).then(function(hard) {
                        var data = [];
                        data.push(profile);
                        data.push(easy);
                        data.push(medium);
                        data.push(hard);
                        res.render('Profile', {
                            name : profile[0].username,
                            game : profile[0].gamesplayed,
                            object : JSON.stringify(data)
                        });
                    })
                })
            })
        })
    } else {
        res.redirect("/");
    }
})
router.get("/ranking", (req, res) => {
    Promise.resolve(Game.getEasy()).then(function(easy) {
        Promise.resolve(Game.getMedium()).then(function(medium) {
            Promise.resolve(Game.getHard()).then(function(hard) {
                var data = [];
                data.push(easy);
                data.push(medium);
                data.push(hard);
                res.render('Leaderboard', {
                    object : JSON.stringify(data)
                });
            })
        })
    })
})

module.exports = router;
