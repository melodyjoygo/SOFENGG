const express = require("express");
const router = express.Router();
const cryptojs = require("crypto-js")

const Users = require("../model/user");

router.get("/",(req,res)=>{
    Promise.resolve(Users.getAllTableView()).then(function(value){
        
        res.render("employees.hbs",{
            employees:value
        })  
    })
})

router.post("/add",(req,res)=>{
    let fname = req.body.fname
    let lname = req.body.lname
    let email = req.body.email
    let pass = req.body.password
    let conf = req.body.confpassword
    let type = req.body.role
    let nick = req.body.nickname
    let fullname = fname
    let empty = false
    let notvalid = false
    var regx = /^([a-z A-Z 0-9\.-]+)@([a-z A-Z 0-9-]+).([a-z A-Z]{2,8})(.[a-z A-Z]{2,8})$/
    
    fullname += " " + lname
    
    if(fname === ""  || lname === "" || email === "" || pass === ""  || conf === "")
        empty = true
    
    if(!regx.test(email)){
        notvalid = true   
    }
    
    if(empty){
        res.render("employees.hbs",{
                        error:4
                    })
    }
    else if(notvalid){
         res.render("employees.hbs",{
                        error:5
                    })
    }
    else{
        Promise.resolve(Users.checkuser(email)).then(function(value){
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
               Promise.resolve(Users.create(fullname,email,cryptojs.AES.encrypt(pass,"password_key"),type)).then(function(value){
                    res.render("employees.hbs",{
                        error:3
                    })
                }) 
            }

        })  
    }
        
})
    

module.exports = router;