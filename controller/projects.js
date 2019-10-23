const express = require("express");
const router = express.Router();

const Projects = require("../model/projects")
const Clients = require("../model/clients")
const yearTracker = require("../model/year_tracker")

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
    var empty = false
    var currentTime = new Date()
    var twoDigitsYear = parseInt(currentTime.getFullYear().toString().substr(2,2), 10)
    var month = currentTime.getMonth() + 1
    var projectnum
    
    if(month < 10)
        month = "0" +month
    
    if(projectName === "" || clientID === "")
        empty = true
    
    if(empty){
        res.render("projects.hbs",{
                        message:3
                    })
    }
    else{
        Promise.resolve(Projects.getAll()).then(function(value){
            for(let i = 0; i < value.length; i++){
                if((projectName.toLowerCase() === value[i].projectName.toLowerCase()) && clientID == value[i].clientID){
                    exist = true
                }
            }
            if(exist){
                res.render("projects.hbs",{
                    message:1
                })
            }
            else{
                Promise.resolve(yearTracker.getAll()).then(function(value){
                    if(value != ''){
                        Promise.resolve(yearTracker.check()).then(function(value){
                            if(value[0].currYear === currentTime.getFullYear()){
                                Promise.resolve(Projects.getLatest()).then(function(value){
                                    var temp = value[0].projectNumber.split('-')
                                    var projNum = parseInt(temp[1],10) + 1
                                    var zeroes = 5 - projNum.toString().length;
                                    for(let i = 0; i < zeroes;i++){
                                        projNum = "0"+ projNum
                                    }
                                    
                                    projectnum = 'P' + twoDigitsYear + month + '-' + projNum
                                    Promise.resolve(Projects.create(projectName,clientID,projectnum,new Date().toISOString().slice(0, 19).replace('T', ' '))).then(function(value){
                                        res.render("projects.hbs",{
                                                message:2
                                        })
                                    })
                                })
                            }
                            else{
                                Promise.resolve(yearTracker.update(currentTime.getFullYear())).then(function(value){
                                    projectnum = 'P' + twoDigitsYear + month + '-' + '00000'
                                    Promise.resolve(Projects.create(projectName,clientID,projectnum,new Date().toISOString().slice(0, 19).replace('T', ' '))).then(function(value){
                                            res.render("projects.hbs",{
                                                message:2
                                            })
                                        })
                                    })
                                
                            }
                        })
                    }
                    else{
                        projectnum = 'P' + twoDigitsYear + month + '-' + '00000'
                        Promise.resolve(yearTracker.create(currentTime.getFullYear())).then(function(value){
                            Promise.resolve(Projects.create(projectName,clientID,projectnum,new Date().toISOString().slice(0, 19).replace('T', ' '))).then(function(value){
                                res.render("projects.hbs",{
                                    message:2
                                })
                            })
                        })
                    }
                })
                
            }
        }) 
    }     
})

module.exports = router;