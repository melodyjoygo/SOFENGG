const express = require("express");
const router = express.Router();

const Game = require("../model/game"); 
const Admin = require("../model/admin");

router.get("/", (req, res) => {
    res.render("Admin");
})

router.get("/database", (req, res) => {
    Promise.resolve(Admin.getData()).then(function(value) {
        res.render("AdminDatabase", {
            object : JSON.stringify(value)
        });
    })
})

router.get("/ranking", (req, res) => {
    Promise.resolve(Game.getEasy()).then(function(easy) {
        Promise.resolve(Game.getMedium()).then(function(medium) {
            Promise.resolve(Game.getHard()).then(function(hard) {
                var data = [];
                data.push(easy);
                data.push(medium);
                data.push(hard);
                res.render('AdminRankings', {
                    object : JSON.stringify(data)
                });
            })
        })
    })
})

router.post("/addDatabase", (req, res) => {
    Admin.addText(req.body.newTitle, req.body.newText);
    res.redirect("/admin/database");
})

router.post("/removeDatabase", (req, res) => {
    Admin.deleteText(req.body.textID);
    res.redirect("/admin/database");
})

router.post("/updateDatabase", (req, res) => {
    Admin.updateText(req.body.updateID, req.body.updateTitle, req.body.updateText);
    res.redirect("/admin/database");
})

module.exports = router;