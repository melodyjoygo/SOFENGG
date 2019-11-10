const express = require("express");
const router = express.Router();

const Items = require("../model/inventory")
const Projects = require("../model/projects")
const Requests = require("../model/request")
const Materials = require("../model/materials")

router.get("/",(req,res)=>{
    
    Promise.resolve(Items.getAllTableView()).then(function(items){
       res.render("stockman_inventory.hbs",{
        item:items
        })                                           
    })
})

router.get("/requests",(req,res)=>{
    Promise.resolve(Projects.getAll()).then(function(projects){
        Promise.resolve(Items.getAllTableView()).then(function(items){
            res.render("stockman_release_request.hbs",{
                projects:projects,
                items:items
            })
        })
    })
    
})

router.post("/restock",(req,res)=>{
    let receiptNumber = req.body.deliveryReceiptNumber
    let invID = req.body.invID
    let qty = req.body.qty
    var empty = false
    
    if(qty === "" || receiptNumber === "")
        empty = true
    
    if(empty){
        res.render("stockman_inventory.hbs",{
            message:1
        })
    }
    else{
        Promise.resolve(Items.restock(invID,qty)).then(function(value){
            Promise.resolve(Items.updateDate(invID,new Date().toISOString().slice(0, 19).replace('T', ' '))).then(function(value){
                res.render("stockman_inventory.hbs",{
                    message:2
                })
            })
        })
    }
})

router.post("/request",(req,res)=>{
    let projectID = req.body.projectID
    let itemID = req.body.itemID
    let qty = req.body.qty
    var empty = false
    
    if(qty === "")
        empty = true
    
    if(empty){
        res.render("stockman_release_request.hbs",{
                message:1
        })
    }
    else{
        Promise.resolve(Materials.findItem(itemID)).then(function(item){
            Promise.resolve(Requests.create(item[0].materialID,item[0].materialName,item[0].materialType,item[0].supplierID,item[0].price,'0','0','0',new Date().toISOString().slice(0, 19).replace('T', ' '),req.session.userID,projectID)).then(function(value){
                res.render("stockman_release_request.hbs",{
                    message:2
                })
            })
        })
    }
})

module.exports = router;