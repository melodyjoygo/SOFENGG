const express = require("express");
const router = express.Router();

const Inventory = require("../model/inventory")
const Delivery = require("../model/delivery_tracker")
const ClerkRequest = require("../model/clerk_requests")

router.get("/",(req,res)=>{
    Promise.resolve(Inventory.getAllTableView()).then(function(inventory){
       res.render("clerk_inventory.hbs",{
            inventory:inventory,
            firstName: req.session.firstName,
            lastName :req.session.lastName,
            currEmail: req.session.email,
            currType: req.session.type,
            password: req.session.password
        }) 
    }) 
})

router.get("/priceInput",(req,res)=>{
    Promise.resolve(Delivery.getAllWithNoPrice()).then(function(deliveries){
        res.render("clerk_price_input.hbs",{
            deliveries:deliveries,
            firstName: req.session.firstName,
            lastName :req.session.lastName,
            currEmail: req.session.email,
            currType: req.session.type,
            password: req.session.password
        })
    })  
})

router.get("/deliveryTracker",(req,res)=>{
    let userID = req.session.userID
    Promise.resolve(Delivery.getClerkEditable(userID)).then(function(deliveries){
        res.render("clerk_delivery_tracker.hbs",{
            deliveries:deliveries,
            firstName: req.session.firstName,
            lastName :req.session.lastName,
            currEmail: req.session.email,
            currType: req.session.type,
            password: req.session.password
        })
    })
})

router.post("/add",(req,res)=>{
    let itemID = req.body.itemID
    let unitCost = req.body.unitCost
    unitCost = unitCost.replace(/<[^>]*>/g, '');

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
    let deliveryID = req.body.deliveryID
    let invoiceNumber = req.body.invoiceNumber
    let poNumber = req.body.poNumber
    let unitCost = req.body.unitCost
    let itemID = req.body.itemID
    let quantity = req.body.quantity
    let userID = req.session.userID
    var empty = false

    invoiceNumber = invoiceNumber.replace(/<[^>]*>/g, '');
    poNumber = poNumber.replace(/<[^>]*>/g, '');
    unitCost = unitCost.replace(/<[^>]*>/g, '');
    itemID = itemID.replace(/<[^>]*>/g, '');
    quantity = quantity.replace(/<[^>]*>/g, '');

    
    if(invoiceNumber === '' || poNumber === "" || unitCost === "" || deliveryID === "")
        empty = true;
    
    if(empty){
        res.render("clerk_price_input.hbs",{
            message:1
        })
    }
    else{
        Promise.resolve(Delivery.getDelivery(deliveryID)).then(function(delivery){
            if(delivery[0].invoiceNumber == '0' && delivery[0].poNumber == '0' && delivery[0].unitPrice == '0'){
                Promise.resolve(ClerkRequest.getCurrRequest()).then(function(data){
                    let count = data[0].count + 1
                    Promise.resolve(Delivery.edit(deliveryID,invoiceNumber,poNumber,unitCost,count)).then(function(value){
                        Promise.resolve(ClerkRequest.addToInvRequest(itemID,quantity,unitCost,userID,'Pending',poNumber)).then(function(value){
                            res.render("clerk_price_input.hbs",{
                                message:2
                            })
                        }) 
                    })
                })  
            }
            else{
                res.redirect("/clerk/priceInput")
            }
        })
    }
})

router.post("/editPrice",(req,res)=>{
    let invoiceNumber = req.body.invoiceNumber
    let poNumber = req.body.poNumber
    let unitCost = req.body.unitCost
    let deliveryID = req.body.deliveryID
    let requestID = req.body.requestID

    invoiceNumber = invoiceNumber.replace(/<[^>]*>/g, '');
    poNumber = poNumber.replace(/<[^>]*>/g, '');
    unitCost = unitCost.replace(/<[^>]*>/g, '');
    deliveryID = deliveryID.replace(/<[^>]*>/g, '');
    requestID = requestID.replace(/<[^>]*>/g, '');

    console.log(poNumber)
    var empty = false
    
    if(invoiceNumber === '' || poNumber === "" || unitCost === "" || deliveryID === "" || requestID === "")
        empty = true;
    
    if(empty){
        res.render("clerk_delivery_tracker.hbs",{
            message:1
        })
    }
    else{
        Promise.resolve(Delivery.edit(deliveryID,invoiceNumber,poNumber,unitCost,requestID)).then(function(value){
            Promise.resolve(ClerkRequest.edit(unitCost,poNumber,requestID)).then(function(value){
                res.render("clerk_delivery_tracker.hbs",{
                    message:2
                })
            })
        })
    }
})

module.exports = router;