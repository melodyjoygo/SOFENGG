const express = require("express");
const router = express.Router();

const User = require("../model/user");

router.use("/game", require("./game"));
router.use("/typericer", require("./typericer"));
router.use("/admin", require("./admin"));

router.post("/register", (req, res) => {
    User.create(req.body.user, req.body.pass);
    req.session.username = req.body.user;
    req.session.password = req.body.pass;
    res.cookie("username", req.session.username, {
        maxAge: 10*60*60*1000
    })
    res.cookie("password", req.session.password, {
        maxAge: 10*60*60*1000
    })
    res.redirect("/typericer");
})
router.post("/login", (req, res) => {
    if(req.body.un == 'admin') {
        if(req.body.pw == 'admin') {
            req.session.destroy();
            res.clearCookie("username");
            res.clearCookie("password");
            res.redirect("/admin");
        } else {
            res.redirect("/typericer")
        }
    } else {
        req.session.username = req.body.un;
        req.session.password = req.body.pw;            
        res.cookie("username", req.session.username, {
            maxAge: 10*60*60*1000
        })
        res.cookie("password", req.session.password, {
            maxAge: 10*60*60*1000
        })
        res.redirect("/typericer");
    }
})
router.get("/guest", (req, res) => {
    Promise.resolve(User.getUser('guest')).then(function(value) {
        if(value != '') {
            req.session.username = value[0].username;
            res.clearCookie("username");
            res.clearCookie("password");
        } 
        res.redirect("/typericer");
    })
})
router.get("/", (req, res) => {
    res.redirect("/typericer");
})
router.get("/logout", (req, res) => {
    req.session.destroy();
    res.clearCookie("username");
    res.clearCookie("password");
    res.redirect("/");
})

module.exports = router;