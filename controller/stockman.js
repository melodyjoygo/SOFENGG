const express = require("express");
const router = express.Router();

const Items = require("../model/inventory")
const Projects = require("../model/projects")
const Requests = require("../model/request")
const Materials = require("../model/materials")
const Suppliers = require("../model/suppliers")
const Tracker = require("../model/delivery_tracker")

router.get("/",(req,res)=>{
    
    Promise.resolve(Suppliers.getAll()).then(function(suppliers){
        Promise.resolve(Materials.getAll()).then(function(items){
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

router.get("/stockman/requests",(req,res)=>{
    Promise.resolve(Projects.getAll()).then(function(projects){
        Promise.resolve(Items.getAllTableView()).then(function(items){
            res.render("stockman_release_request.hbs",{
                projects:projects,
                items
            })
        })
    })
    
})

router.post("/restock",(req,res)=>{
    let receiptNumber = req.body.deliveryReceiptNumber
    let itemID = req.body.itemID
    let qty = req.body.qty
    let suppID = req.body.suppID
    var empty = false
    
    if(qty === "" || receiptNumber === "")
        empty = true
    
    if(empty){
        res.render("stockman_inventory.hbs",{
            message:1
        })
    }
    else{
        Promise.resolve(Tracker.create(receiptNumber,itemID,qty,suppID)).then(function(value){
            res.render("stockman_inventory.hbs",{
                message:2
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

router.post("/edit",(req,res)=>{
    let deliveryID = req.body.deliveryID
    let newdeliveryReceiptNumber = req.body.deliveryReceiptNumber
    let newitemID = req.body.itemID
    let newqty = req.body.qty
    let newsuppID = req.body.suppID
    
    let newdeliveryReceiptNumber = req.body.currdeliveryReceiptNumber
    let newitemID = req.body.curritemID
    let newqty = req.body.currqty
    let newsuppID = req.body.currsuppID
    
    console.log("deliveryID"+deliveryID)
    console.log("deliveryReceiptNumber"+deliveryReceiptNumber)
    console.log("itemID"+itemID)
    console.log("qty"+qty)
    console.log("suppID"+suppID)
    
    var empty = false
    
     if(deliveryID === "" || deliveryReceiptNumber === "" || itemID === "" || qty === "" || suppID === "")
        empty = true
    
    if(empty){
        res.render("stockman_inventory.hbs",{
                message:1
        })
    }
    else{
        Promise.resolve()
        res.render("stockman_inventory.hbs",{
            message:3
        })
    }
})

module.exports = router;