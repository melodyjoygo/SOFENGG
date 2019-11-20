const express = require("express");
const router = express.Router();

const Inventory = require("../model/inventory")
const Delivery = require("../model/delivery_tracker")
const ClerkRequest = require("../model/clerk_requests")

router.get("/",(req,res)=>{
    Promise.resolve(Inventory.getAllTableView()).then(function(inventory){
       res.render("clerk_inventory.hbs",{
            inventory:inventory
        }) 
    }) 
})

router.get("/priceInput",(req,res)=>{
    Promise.resolve(Delivery.getAllWithNoPrice()).then(function(deliveries){
        res.render("clerk_price_input.hbs",{
            deliveries:deliveries
        })
    })  
})

router.get("/deliveryTracker",(req,res)=>{
    Promise.resolve(Delivery.getAllWithPrice()).then(function(deliveries){
        res.render("clerk_delivery_tracker.hbs",{
            deliveries:deliveries
        })
    })
})

router.post("/add",(req,res)=>{
    let itemID = req.body.itemID
    let unitCost = req.body.unitCost
    
    var empty = false;
    
    if(unitCost === '')
        empty = true;
    
    if(empty){
        res.render("clerk_inventory.hbs",{
            message:1
        }) 
    }
    else{
        Promise.resolve(Inventory.updateUnitPrice(itemID,unitCost)).then(function(value){
            res.render("clerk_inventory.hbs",{
                message:2
            })
        })
    }
})

router.post("/addPrice",(req,res)=>{
    let invoiceNumber = req.body.invoiceNumber
    let poNumber = req.body.poNumber
    let unitCost = req.body.unitCost
    let deliveryID = req.body.deliveryID
    let itemID = req.body.itemID
    let quantity = req.body.quantity
    let userID = req.session.userID
    var empty = false
    
    if(invoiceNumber === '' || poNumber === "" || unitCost === "" || deliveryID === "")
        empty = true;
    
    if(empty){
        res.render("clerk_price_input.hbs",{
            message:1
        })
    }
    else{
        Promise.resolve(ClerkRequest.getCurrRequest()).then(function(data){
            let count = data[0].count + 1
            Promise.resolve(Delivery.edit(deliveryID,invoiceNumber,poNumber,unitCost,count)).then(function(value){
                Promise.resolve(ClerkRequest.addToInvRequest(itemID,quantity,unitCost,userID)).then(function(value){
                    res.render("clerk_price_input.hbs",{
                        message:2
                    })
                }) 
            })
        })       
    }
})

router.post("/editPrice",(req,res)=>{
    let invoiceNumber = req.body.invoiceNumber
    let poNumber = req.body.poNumber
    let unitCost = req.body.unitCost
    let deliveryID = req.body.deliveryID
    let requestID = req.body.requestID
    var empty = false
    
    if(invoiceNumber === '' || poNumber === "" || unitCost === "" || deliveryID === "" || requestID === "")
        empty = true;
    
    if(empty){
        res.render("clerk_price_input.hbs",{
            message:1
        })
    }
    else{
        Promise.resolve(Delivery.edit(deliveryID,invoiceNumber,poNumber,unitCost,requestID)).then(function(value){
            Promise.resolve(ClerkRequest.edit(unitCost,requestID)).then(function(value){
                res.render("clerk_price_input.hbs",{
                    message:2
                })
            })
        })
    }
})

module.exports = router;