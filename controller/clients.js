const express = require("express");
const router = express.Router();

const Clients = require("../model/clients")

function titleCase(str) {
   var splitStr = str.toLowerCase().split(' ');
   for (var i = 0; i < splitStr.length; i++) {
       splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
   }
   return splitStr.join(' '); 
}

router.get("/",(req,res)=>{
    Promise.resolve(Clients.getAllTableView()).then(function(value){
        res.render("clients.hbs",{
            clients:value,
            userType:req.session.userType,
            firstName: req.session.firstName,
            lastName :req.session.lastName,
            currEmail: req.session.email,
            currType: req.session.type,
            password: req.session.password
        })  
    })
})

router.post("/add",(req,res)=>{
    let client = req.body.clientname.trim()
    client = client.replace(/<[^>]*>/g, '');
    var exist = false;
    var empty = false;
    
    if(client === "")
        empty = true
    
    if(empty){
        res.render("clients.hbs",{
                    message:3
                }) 
    }
    else{
        Promise.resolve(Clients.getAll()).then(function(value){
            for(let i = 0; i < value.length; i++){
                if(client.toLowerCase() === value[i].clientName.toLowerCase().trim()){
                    exist = true
                }
            }
            if(exist){
                res.render("clients.hbs",{
                    message:1
                })
            }
            else{
                client = titleCase(client)
                Promise.resolve(Clients.create(client)).then(function(value){
                    res.render("clients.hbs",{
                        message:2
                    })
                })
            }
        })  
    }
})

router.post("/edit",async (req,res)=>{
    clientID = req.body.clientID
    clientName = req.body.clientName.trim()
    
    console.log(clientID)
    console.log(clientName)
    
    var empty = false;
    var exist = false;
    
    if(clientID === "" || clientName === "")
        empty = true
    
    await Promise.resolve(Clients.getAll()).then(function(value){
        for(let i = 0; i < value.length; i++){
            if(clientName.toLowerCase() === value[i].clientName.toLowerCase().trim()){
                if(clientID != value[i].clientID)
                    exist = true
            }            
        }
    })
    
    if(empty){
        res.render("clients.hbs",{
                    message:3
        }) 
    }
    else if(exist){
        res.render("clients.hbs",{
                    message:1
        }) 
    }
    else{
        clientName = titleCase(clientName)
        Promise.resolve(Clients.edit(clientID,clientName)).then(function(data){
            res.render("clients.hbs",{
                message:4
            })
        })
    }
})

module.exports = router;
