const express = require("express");
const router = express.Router();

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
    let un = fname
    let fullname = fname
    un += "_"
    un += lname
    fullname += " "
    fullname += lname
    un = un.toLowerCase()
    
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
           Promise.resolve(Users.create(un,fullname,pass,type)).then(function(value){
                res.render("employees.hbs",{
                    error:3
                })
            }) 
        }
        
    })
})
    

module.exports = router;