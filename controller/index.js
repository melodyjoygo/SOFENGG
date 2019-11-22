const express = require("express")
const router = express.Router();
const cryptojs = require("crypto-js")

const Users = require("../model/user")

router.use("/employees", require("./employees"))
router.use("/clients",require("./clients"))
router.use("/suppliers",require("./suppliers"))
router.use("/projects",require("./projects"))
router.use("/inventory",require("./inventory"))
router.use("/orders",require("./orders"))
router.use("/stockman",require("./stockman"))
router.use("/clerk",require("./clerk"))
router.use("/requisitions",require("./requisitions"))
router.use("/delivery_tracker",require("./delivery_tracker"))

router.get("/",(req,res)=>{
    res.render("login.hbs")
})

router.post("/login" ,(req,res)=>{
    let email = req.body.email
    let pass = req.body.pw
    let empty = false;
    
    if(email === "" || pass === "")
        empty = true;
    
    if(empty){
        res.render("login.hbs",{
                    error:3
                })  
    }
    else {
        Promise.resolve(Users.getUser(email)).then(function(value){
            if(value != ''){
                var phash = cryptojs.AES.decrypt(value[0].password,"password_key")
                var pnormal = phash.toString(cryptojs.enc.Utf8)
                if(pass != pnormal){
                    res.render("login.hbs",{
                        error:1
                    })   
                }
                else{
                    console.log("User ID Before : " + req.session.userID)
                    console.log("User Type Before : " + req.session.userType)
                    if(typeof req.session.userID === "undefined"){
                        console.log("Adding Current USER ID")
                        req.session.userID = value[0].userID
                        req.session.userType = value[0].userType
                    }
                    console.log("User ID After : " + req.session.userID)
                    console.log("User Type After : " + req.session.userType)
                    switch(req.session.userType){
                        case 0 : res.redirect("/dashboard")
                        break
                        case 1 : res.redirect("/dashboard")
                        break
                        case 2 : res.redirect("/clerk")
                        break
                        case 3 : res.redirect("/clerk")
                        break
                        case 4 : res.redirect("/stockman")
                        break
                            
                    } 
                }   
            }
            else{
                res.render("login.hbs",{
                        error:2
                })       
            }
        })  
    }
        
})

router.get("/logout",(req,res)=>{
    req.session.userID = ""
    req.session.userType = ""
    res.redirect("/")
})

router.get("/dashboard",(req,res)=>{
    res.render("dashboard.hbs")
})

router.get("/reports",(req,res)=>{
    res.render("reports.hbs")
})


module.exports = router;