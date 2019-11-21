const express = require("express")
const router = express.Router();
const cryptojs = require("crypto-js")

const Requests = require("../model/requests")
const Inventory = require("../model/inventory")
const clerkRequests = require("../model/clerk_requests")

router.get("/",(req,res)=>{
    Promise.resolve(Requests.getClerkAddRequests()).then(function(clerkEditRequests){
        Promise.resolve(Requests.getStockmanEditRequests()).then(function(stockmanEditRequests){
            Promise.resolve(Requests.getStockmanReleaseRequests()).then(function(stockmanReleaseRequests){
                res.render("requisitions.hbs",{
                    clerkEditRequests:clerkEditRequests,
                    stockmanEditRequests:stockmanEditRequests,
                    stockmanReleaseRequests:stockmanReleaseRequests
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
                Promise.resolve(clerkRequests.updateStatus(clerkAddRequestID,'Approved')).then(function(){
                    res.render("requisitions.hbs",{
                        message:2
                    })
                })
            })
        }
        else
            res.redirect("/requisitions")
    }
})

router.post("/stockmanRelease",(req,res)=>{
    
})

router.post("/stockmanEdit",(req,res)=>{
    
})

module.exports = router;