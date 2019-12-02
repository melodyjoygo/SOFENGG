const express = require("express");
const router = express.Router();

const Projects = require("../model/projects")
const Clients = require("../model/clients")
const yearTracker = require("../model/year_tracker")
const projectMaterials = require("../model/project_material")
const materials = require("../model/materials")

router.get("/",(req,res)=>{
    Promise.resolve(Projects.getAll()).then(function(projects){
        Promise.resolve(Clients.getAll()).then(function(clients){
            Promise.resolve(materials.getAllWithSupplier()).then(function(materials){
               res.render("projects.hbs",{
                    projects:projects,
                    clients:clients,
                    materials:materials,
                    userType:req.session.userType
                }) 
            }) 
        })
            
    })
})

router.post("/loadProjectMaterials",(req,res)=>{
    let projID = req.body.projID
    
    Promise.resolve(projectMaterials.getAllProjectMaterials(projID)).then(function(value){
        res.send(value)
    })
})

router.post("/addProjectMaterials",(req,res)=>{
    let projectID = req.body.projectID
    let materialID = req.body.materialID
    let qty = req.body.qty
    
    Promise.resolve(projectMaterials.create(projectID,materialID,qty,0)).then(function(data){
        res.send("Success")
    })
})

router.post("/editProjectDetails",(req,res)=>{
    let projID = req.body.projID
    let clientID = req.body.clientID
    let status = req.body.status
    var empty = false
    
    if(projID === "" || clientID === "" || status === "")
        empty = true
    
    if(empty){
        res.render("projects.hbs",{
            message:3
        })
    }
    else{
        Promise.resolve(Projects.editProjectDetails(projID,clientID,status)).then(function(value){
            res.render("projects.hbs",{
                message:4
            })
        })
    }
})

router.post("/editProjectMaterial",(req,res)=>{
    let pmID = req.body.pmID
    let qty = req.body.qty
    let itemID = req.body.itemID
    
    var empty = false
    
    if(pmID === "" || qty === "" || itemID === "")
        empty = true
    
    if(empty){
        res.render("projects.hbs",{
            message:3
        })
    }
    else{
        Promise.resolve(projectMaterials.edit(pmID,qty,itemID))
        res.send("success")
       
    }
})

router.post('/add',(req,res)=>{
    let clientID = req.body.clientID
    var exist = false
    var empty = false
    var currentTime = new Date()
    var twoDigitsYear = parseInt(currentTime.getFullYear().toString().substr(2,2), 10)
    var month = currentTime.getMonth() + 1
    var projectnum
    
    if(month < 10)
        month = "0" +month
    
    if(clientID === "")
        empty = true
    
    if(empty){
        res.render("projects.hbs",{
                        message:3
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
                            Promise.resolve(Projects.create(clientID,projectnum,new Date().toISOString().slice(0, 19).replace('T', ' '))).then(function(value){
                                res.render("projects.hbs",{
                                        message:2
                                })
                            })
                        })
                    }
                    else{
                        Promise.resolve(yearTracker.update(currentTime.getFullYear())).then(function(value){
                            projectnum = 'P' + twoDigitsYear + month + '-' + '00000'
                            Promise.resolve(Projects.create(clientID,projectnum,new Date().toISOString().slice(0, 19).replace('T', ' '))).then(function(value){
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
                    Promise.resolve(Projects.create(clientID,projectnum,new Date().toISOString().slice(0, 19).replace('T', ' '))).then(function(value){
                        res.render("projects.hbs",{
                            message:2
                        })
                    })
                })
            }
        })
    }     
})

module.exports = router;