const express = require("express");
const router = express.Router();
const cryptojs = require("crypto-js")

const Users = require("../model/user");

router.get("/",(req,res)=>{
    res.render("employees.hbs")
})

router.post("/add",(req,res)=>{
    let fname = req.body.fname
    let lname = req.body.lname
    let email = req.body.email
    let pass = req.body.password
    let conf = req.body.confpassword
    let type = req.body.role
    let nick = req.body.nickname
    let un = fname
    let fullname = fname
    let empty = false
    un += "_" + lname + "_" + nick
    fullname += " " + lname
    un = un.toLowerCase()
    
    if(fname === ""  || lname === "" || email === "" || pass === ""  || conf === "")
        empty = true
    
    if(empty){
        res.render("employees.hbs",{
                        error:4
                    })
    }
    else{
        Promise.resolve(Users.checkuser(un)).then(function(value){
            if(value != ''){
                res.render("employees.hbs",{
                    error:1
                })
            }
            else if(!(pass === conf)){
                res.render("employees.hbs",{
                error:2
                })    
            }
            else{
               Promise.resolve(Users.create(un,fullname,email,cryptojs.AES.encrypt(pass,"password_key"),type)).then(function(value){
                    res.render("employees.hbs",{
                        error:3
                    })
                }) 
            }

        })  
    }
        
})
    

module.exports = router;