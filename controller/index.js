const express = require("express");
const router = express.Router();
const cryptojs = require("crypto-js")

const Users = require("../model/user");

router.use("/employees", require("./employees"));
router.use("/clients",require("./clients"))
router.use("/suppliers",require("./suppliers"))
router.use("/projects",require("./projects"))
router.use("/inventory",require("./inventory"))

router.get("/",(req,res)=>{
    res.render("login.hbs")
})

router.post("/login" ,(req,res)=>{
    let un = req.body.un
    let pass = req.body.pw
    let empty = false;
    
    if(un === "" || pass === "")
        empty = true;
    
    if(empty){
        res.render("login.hbs",{
                    error:3
                })  
    }
    else {
        Promise.resolve(Users.getUser(un)).then(function(value){
            if(value != ''){
                var phash = cryptojs.AES.decrypt(value[0].password,"password_key")
                var pnormal = phash.toString(cryptojs.enc.Utf8)
                if(pass != pnormal){
                    res.render("login.hbs",{
                        error:1
                    })   
                }
                else{
                    res.render("dashboard.hbs")   
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

router.get("/dashboard",(req,res)=>{
    res.render("dashboard.hbs")
})

router.get("/requisitions",(req,res)=>{
    res.render("requisitions.hbs")
})

router.get("/reports",(req,res)=>{
    res.render("reports.hbs")
})


module.exports = router;