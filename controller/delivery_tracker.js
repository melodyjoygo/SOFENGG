const express = require("express");
const router = express.Router();

const Deliveries = require("../model/delivery_tracker")
const Materials = require("../model/materials")
const ClerkRequest = require("../model/clerk_requests")

router.get("/",(req,res)=>{
    let userID = req.session.userID
    
    Promise.resolve(Deliveries.getClerkEditable(userID)).then(function(deliveries){
        Promise.resolve(Materials.getAllWithSupplier()).then(function(items){
            res.render("delivery_tracker.hbs",{
                deliveries:deliveries,
                items:items,
                userType:req.session.userType
            })
        })
    })
})

router.post("/restock",(req,res)=>{
    let deliveryReceiptNumber = req.body.deliveryReceiptNumber
    let itemID = req.body.itemID
    let qty = req.body.qty
    let invoiceNumber = req.body.invoiceNumber
    let poNumber = req.body.poNumber
    let unitPrice = req.body.unitPrice
    let userID = req.session.userID
    
    var empty = false
    
    if(deliveryReceiptNumber === ""  || itemID === "" || qty === "" || invoiceNumber === ""  || unitPrice === "")
        empty = true
    
    if(empty){
        res.render("delivery_tracker.hbs",{
            message:1
        })
    }
    else{
        Promise.resolve(ClerkRequest.getCurrRequest()).then(function(data){
             let count = data[0].count + 1
             Promise.resolve(Deliveries.createSuperAdmin(deliveryReceiptNumber,itemID,qty,invoiceNumber,poNumber,unitPrice,userID,count)).then(function(){
                Promise.resolve(ClerkRequest.addToInvRequest(itemID,qty,unitPrice,userID,'Pending')).then(function(){
                    res.render("delivery_tracker.hbs",{
                        message:2
                    })
                })
             })
        })
    }
})

router.post("/edit",(req,res)=>{
    let deliveryID = req.body.deliveryID
    let deliveryReceiptNumber = req.body.deliveryReceiptNumber
    let itemID = req.body.itemID
    let quantity = req.body.quantity
    let poNumber = req.body.poNumber
    let invoiceNumber = req.body.invoiceNumber
    let unitCost = req.body.unitCost
    let requestID = req.body.requestID
    
    var empty = false
    
    if(deliveryID === ""  || deliveryReceiptNumber === "" || itemID === "" || quantity === ""  || poNumber === "" || invoiceNumber === "" || unitCost === "" || requestID === "")
        empty = true
    
    if(empty){
        res.render("delivery_tracker.hbs",{
            message:1
        })
    }
    else{
        Promise.resolve(Deliveries.editAll(deliveryReceiptNumber,itemID,quantity,poNumber,invoiceNumber,unitCost,deliveryID)).then(function(data){
            Promise.resolve(ClerkRequest.editAll(itemID,quantity,unitCost,requestID)).then(function(value){
                res.render("delivery_tracker.hbs",{
                    message:3
                })
            })
        })
    }
    
})

module.exports = router;