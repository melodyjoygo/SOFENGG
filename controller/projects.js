const express = require("express");
const router = express.Router();

const Projects = require("../model/projects")
const Clients = require("../model/clients")

router.get("/",(req,res)=>{
    Promise.resolve(Clients.getAll()).then(function(value){
        res.render("projects.hbs",{
            clientList:value         
        })
    })
})

router.post('/add',(req,res)=>{
    let projectName = req.body.projectName
    let clientID = req.body.clientID
    var exist = false
    
    Promise.resolve(Projects.getAll()).then(function(value){
        for(let i = 0; i < value.length; i++){
            if((projectName.toLowerCase() === value[i].projectName.toLowerCase()) && clientID === value[i].clientID){
                exist = true
            }
        }
        if(exist){
            res.render("projects.hbs",{
                message:1
            })
        }
        else{
            Promise.resolve(Projects.create(projectName,clientID)).then(function(value){
                res.render("projects.hbs",{
                    message:2
                })
            })
        }
    })
})

module.exports = router;