const express = require("express")
const router = express.Router();
const cryptojs = require("crypto-js")

const Requests = require("../model/requests")
const Inventory = require("../model/inventory")
const clerkRequests = require("../model/clerk_requests")
const stockmanRequests = require("../model/stockman_requests")
const deliveryTracker = require("../model/delivery_tracker")
const orders = require("../model/transaction")

router.get("/",(req,res)=>{
    Promise.resolve(Requests.getClerkAddRequests()).then(function(clerkEditRequests){
        Promise.resolve(Requests.getStockmanEditRequests()).then(function(stockmanEditRequests){
            Promise.resolve(Requests.getStockmanReleaseRequests()).then(function(stockmanReleaseRequests){
                res.render("requisitions.hbs",{
                    clerkEditRequests:clerkEditRequests,
                    stockmanEditRequests:stockmanEditRequests,
                    stockmanReleaseRequests:stockmanReleaseRequests,
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

router.post("/clerkAdd",(req,res)=>{
    let clerkAddRequestID = req.body.requestID
    let itemID = req.body.itemID
    let unitCost = req.body.unitCost
    let quantity = req.body.quantity
    let action = req.body.action
    let poNumber = req.body.poNumber
    
    console.log("PO:" + poNumber)
    
    var empty = false
    
    if(clerkAddRequestID === "" || itemID === "" || unitCost === "" || quantity === "" || action === "")
        empty = true
    
    if(empty){
        res.render("requisitions.hbs",{
            message:1
        })
    }
    else{
        if(action === 'Accept'){
            Promise.resolve(Inventory.create(itemID,quantity,new Date().toISOString().slice(0, 19).replace('T', ' '),unitCost)).then(function(){
                Promise.resolve(deliveryTracker.inInventory(clerkAddRequestID,1)).then(function(){
                    Promise.resolve(clerkRequests.updateStatus(clerkAddRequestID,'Approved')).then(function(){
                        Promise.resolve(orders.arrived(itemID,quantity,unitCost,poNumber)).then(function(){
                            res.render("requisitions.hbs",{
                                message:2
                            })
                        })
                    })
                })
            })
        }
        else{
            console.log("Decline")
            Promise.resolve(clerkRequests.updateStatus(clerkAddRequestID,'Declined')).then(function(){
                res.redirect("/requisitions")
            })
        }
            
    }
})

router.post("/stockmanEdit",(req,res)=>{
    let requestID = req.body.requestID
    let deliveryID = req.body.deliveryID
    let deliveryReceiptNumber = req.body.deliveryReceiptNumber
    let quantity = req.body.quantity
    let newItemID = req.body.newItemID
    let action = req.body.action
    
    var empty = false
    
    if(requestID === "" || deliveryID === "" || deliveryReceiptNumber === "" || quantity === "" || newItemID === "")
        empty = true
    
    if(empty){
        res.render("requisitions.hbs",{
            message:1
        })
    }
    else{
        if(action === 'Accept'){
            Promise.resolve(stockmanRequests.changeEditStatus(requestID,'Approved')).then(function(){
                Promise.resolve(deliveryTracker.stockmanEdit(deliveryID,deliveryReceiptNumber,quantity,newItemID)).then(function(){
                    Promise.resolve(deliveryTracker.getRequestID(deliveryID)).then(function(data){
                        let clerkAddRequestID = data[0].requestID
                        Promise.resolve(clerkRequests.editAddToInv(clerkAddRequestID,newItemID,quantity)).then(function(){
                            res.render("requisitions.hbs",{
                                message:3
                            })
                        })
                    })
                })
            })
        }
        else{
            Promise.resolve(stockmanRequests.changeReleaseStatus(requestID,'Declined')).then(function(){
                res.redirect("/requisitions")
            }) 
        }
    }
})

router.post("/stockmanRelease",(req,res)=>{
    let requestID = req.body.requestID
    let action = req.body.action
    
    var empty = false
    
    if(requestID === "")
        empty = true
    
    if(empty){
        res.render("requisitions.hbs",{
            message:1
        })
    }
    
    else{
        if(action === 'Accept'){
            Promise.resolve(stockmanRequests.changeReleaseStatus(requestID,'Approved')).then(function(){
                res.render("requisitions.hbs",{
                    message:4
                })
            })
        }
        else{
            Promise.resolve(stockmanRequests.changeReleaseStatus(requestID,'Declined')).then(function(){
                res.redirect("/requisitions")
            })
        }
            
    }
})

module.exports = router;