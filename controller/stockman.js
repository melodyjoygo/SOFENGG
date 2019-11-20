const express = require("express");
const router = express.Router();

const Items = require("../model/inventory")
const Projects = require("../model/projects")
const Materials = require("../model/materials")
const Suppliers = require("../model/suppliers")
const Tracker = require("../model/delivery_tracker")
const Requests = require("../model/stockman_requests")

router.get("/",(req,res)=>{
    
    Promise.resolve(Suppliers.getAll()).then(function(suppliers){
        Promise.resolve(Materials.getAllWithSupplier()).then(function(items){
            Promise.resolve(Tracker.getAll()).then(function(deliveries){
                res.render("stockman_inventory.hbs",{
                    suppliers:suppliers,
                    items:items,
                    deliveries:deliveries
                }) 
            })     
        })                                     
    })
})

router.get("/requests",(req,res)=>{
    Promise.resolve(Projects.getAll()).then(function(projects){
        Promise.resolve(Materials.getAllWithSupplier()).then(function(items){
            Promise.resolve(Requests.getPending()).then(function(pending){
                Promise.resolve(Requests.getApproved()).then(function(approved){
                    res.render("stockman_release_request.hbs",{
                        projects:projects,
                        items:items,
                        pending:pending,
                        approved:approved
                    })
                })
            })  
        })
    })
})

router.post("/restock",(req,res)=>{
    let receiptNumber = req.body.deliveryReceiptNumber
    let itemID = req.body.itemID
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
        Promise.resolve(Tracker.create(receiptNumber,itemID,qty)).then(function(value){
            res.render("stockman_inventory.hbs",{
                message:2
            })
        })
    }
})

router.post("/releaseRequest",(req,res)=>{
    let projectID = req.body.projectID
    let itemID = req.body.itemID
    let qty = req.body.qty
    let userID = req.session.userID
    var empty = false
    
    if(qty === "" || projectID === "" || itemID === "")
        empty = true
    
    if(empty){
        res.render("stockman_release_request.hbs",{
            message:1
        })
    }
    else{
        Promise.resolve(Requests.createReleaseRequest(projectID,itemID,qty,"Pending",new Date().toISOString().slice(0, 19).replace('T', ' '),userID)).then(function(data){
            res.render("stockman_release_request.hbs",{
                message:2
            }) 
        })
    }
})

router.post("/editRequest",(req,res)=>{
    let deliveryID = req.body.deliveryID
    let newdeliveryReceiptNumber = req.body.deliveryReceiptNumber
    let newitemID = req.body.itemID
    let newqty = req.body.qty
    let newsuppID = req.body.suppID
    
    let currdeliveryReceiptNumber = req.body.currdeliveryReceiptNumber
    let curritemID = req.body.curritemID
    let currqty = req.body.currqty
    let currsuppID = req.body.currsuppID
    let userID = req.session.userID
    
    var empty = false
    
     if(deliveryID === "" || newdeliveryReceiptNumber === "" || newitemID === "" || newqty === "" || newsuppID === "")
        empty = true
    
    if(empty){
        res.render("stockman_inventory.hbs",{
                message:1
        })
    }
    else{
        Promise.resolve(Requests.createEditRequest(deliveryID,newdeliveryReceiptNumber,newitemID,newqty,newsuppID,currdeliveryReceiptNumber,curritemID,currqty,currsuppID,userID)).then(function(value){
            res.render("stockman_inventory.hbs",{
                message:3
            })
        }) 
    }
})

module.exports = router;