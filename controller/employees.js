const express = require("express");
const router = express.Router();
const cryptojs = require("crypto-js")

const Users = require("../model/user");

function titleCase(str) {
   var splitStr = str.toLowerCase().split(' ');
   for (var i = 0; i < splitStr.length; i++) {
       splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
   }
   return splitStr.join(' '); 
}

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
    
    let empty = false
    let notvalid = false
    var regx = /^([a-z A-Z 0-9\.-_]+)@([a-z A-Z 0-9-]+).([a-z A-Z]{2,8})(.[a-z A-Z]{2,8})$/
    
    fname = titleCase(fname)
    lname = titleCase(lname)
    
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
               Promise.resolve(Users.create(fname,lname,email,cryptojs.AES.encrypt(pass,"password_key"),type)).then(function(value){
                    res.render("employees.hbs",{
                        error:3
                    })
                }) 
            }

        })  
    }
        
})

router.post("/edit",(req,res)=>{
    let id = req.body.userID
    let fname = req.body.fname
    let lname = req.body.lname
    let email = req.body.email
    let type = req.body.role
    //let pass = req.body.password
    //let conf = req.body.confpassword
    
    
    let empty = false
    let notvalid = false
    var regx = /^([a-z A-Z 0-9\.-_]+)@([a-z A-Z 0-9-]+).([a-z A-Z]{2,8})(.[a-z A-Z]{2,8})$/
    
    if(fname === ""  || lname === "" || email === "")
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
                if(value[0].userID != id){
                    res.render("employees.hbs",{
                        error:1
                    })
                }
                else{
                    Promise.resolve(Users.edit(id,fname,lname,email,type)).then(function(value){
                        res.render("employees.hbs",{
                            error:6
                        })
                    }) 
                }
            }
            else{
               Promise.resolve(Users.edit(id,fname,lname,email,type)).then(function(value){
                    res.render("employees.hbs",{
                        error:6
                    })
                }) 
            }

        })  
    }
})

module.exports = router;