const express = require("express");
const router = express.Router();

const Projects = require("../model/projects")
const Clients = require("../model/clients")
const projectMaterials = require("../model/project_material")
const materials = require("../model/materials")
const Inventory = require("../model/inventory");

router.get("/",(req,res)=>{
    Promise.resolve(Projects.getAll()).then(function(projects){
        Promise.resolve(Clients.getAll()).then(function(clients){
            Promise.resolve(materials.getAllWithSupplier()).then(function(materials){
                Promise.resolve(Inventory.getAllTableView()).then(function(inventory){
                    res.render("projects.hbs",{
                        projects:projects,
                        clients:clients,
                        materials:materials,
                        inventory:inventory,
                        userType:req.session.userType,
                        firstName: req.session.firstName,
                        lastName :req.session.lastName,
                        currEmail: req.session.email,
                        currType: req.session.type,
                        password: req.session.password
                    }) 
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
    
    Promise.resolve(Inventory.getTotalQty(materialID)).then(function(data){
        if(qty > data[0].totalQty){
            res.send('exceedsQty')
        }
        else{
            Promise.resolve(projectMaterials.create(projectID,materialID,qty)).then(function(data){
                res.send("Success")
            })
        }
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
    let projectNumber = req.body.projectNumber
    var exist = false
    var empty = false
    
    if(clientID === "" || projectNumber === "")
        empty = true
    
    if(empty){
        res.render("projects.hbs",{
                        message:3
                    })
    }
    else{
        Promise.resolve(Projects.create(clientID,projectNumber,new Date().toISOString().slice(0, 19).replace('T', ' '))).then(function(data){
            res.render("projects.hbs",{
                message:2
            })
        })
    }     
})

module.exports = router;