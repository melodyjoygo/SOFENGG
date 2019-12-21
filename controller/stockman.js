const express = require("express");
const router = express.Router();

const Items = require("../model/inventory")
const Projects = require("../model/projects")
const Materials = require("../model/materials")
const Suppliers = require("../model/suppliers")
const Tracker = require("../model/delivery_tracker")
const Requests = require("../model/stockman_requests")
const Inventory = require("../model/inventory")

router.get("/",(req,res)=>{
    let userID = req.session.userID
    Promise.resolve(Suppliers.getAll()).then(function(suppliers){
        Promise.resolve(Materials.getAllWithSupplier()).then(function(items){
            Promise.resolve(Tracker.getStockmanEditable(userID)).then(function(deliveries){
                res.render("stockman_delivery.hbs",{
                    suppliers:suppliers,
                    items:items,
                    deliveries:deliveries,
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

router.get("/requests",(req,res)=>{
    let userID = req.session.userID
    Promise.resolve(Projects.getAll()).then(function(projects){
        Promise.resolve(Materials.getAllWithSupplier()).then(function(items){
            Promise.resolve(Requests.getPending(userID)).then(function(pending){
                Promise.resolve(Requests.getApproved(userID)).then(function(approved){
                    res.render("stockman_release_request.hbs",{
                        projects:projects,
                        items:items,
                        pending:pending,
                        approved:approved,
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

router.get("/inventory",(req,res)=>{
    let userID = req.session.userID
    Promise.resolve(Inventory.getAllTableView()).then(function(inventory){
        res.render("stockman_inventory.hbs",{
            inventory:inventory,
            firstName: req.session.firstName,
            lastName :req.session.lastName,
            currEmail: req.session.email,
            currType: req.session.type,
            password: req.session.password
        })
    })
})

router.post("/restock",(req,res)=>{
    let receiptNumber = req.body.deliveryReceiptNumber
    let itemID = req.body.itemID
    let qty = req.body.qty
    let userID = req.session.userID

    receiptNumber = receiptNumber.replace(/<[^>]*>/g, '');
    itemID = itemID.replace(/<[^>]*>/g, '');
    qty = qty.replace(/<[^>]*>/g, '');
    
    var empty = false

    
    if(qty === "" || receiptNumber === "")
        empty = true
    
    if(empty){
        res.render("stockman_delivery.hbs",{
            message:1
        })
    }
    else{
        Promise.resolve(Tracker.create(receiptNumber,itemID,qty,userID,new Date().toISOString().slice(0, 19).replace('T', ' '))).then(function(value){
            res.render("stockman_delivery.hbs",{
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
    
    projectID = projectID.replace(/<[^>]*>/g, '');
    itemID = itemID.replace(/<[^>]*>/g, '');
    qty = qty.replace(/<[^>]*>/g, '');


    if(qty === "" || projectID === "" || itemID === "")
        empty = true
    
    if(empty){
        res.render("stockman_release_request.hbs",{
            message:1
        })
    }
    else{
        Promise.resolve(Items.getTotalQty(itemID)).then(function(data){
            if(data.length == 0){
                res.render("stockman_release_request.hbs",{
                    message:4
                }) 
            }
            else if(qty > data[0].totalQty){
                res.render("stockman_release_request.hbs",{
                    message:3
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
    }
})

router.post("/editRequest",(req,res)=>{
    let deliveryID = req.body.deliveryID
    let newdeliveryReceiptNumber = req.body.deliveryReceiptNumber
    let newitemID = req.body.itemID
    let newqty = req.body.qty
    
    let currdeliveryReceiptNumber = req.body.currdeliveryReceiptNumber
    let curritemID = req.body.curritemID
    let currqty = req.body.currqty
    let userID = req.session.userID

    deliveryID = deliveryID.replace(/<[^>]*>/g, '');
    newdeliveryReceiptNumber = newdeliveryReceiptNumber.replace(/<[^>]*>/g, '');
    newitemID = newitemID.replace(/<[^>]*>/g, '');
    newqty = newqty.replace(/<[^>]*>/g, '');
    currdeliveryReceiptNumber = currdeliveryReceiptNumber.replace(/<[^>]*>/g, '');
    curritemID = curritemID.replace(/<[^>]*>/g, '');
    currqty = currqty.replace(/<[^>]*>/g, '');
    
    var empty = false
    
    if(deliveryID === "" || newdeliveryReceiptNumber === "" || newitemID === "" || newqty === "")
        empty = true
    
    if(empty){
        res.render("stockman_delivery.hbs",{
                message:1
        })
    }
    else{
        Promise.resolve(Requests.createEditRequest(deliveryID,newdeliveryReceiptNumber,newitemID,newqty,currdeliveryReceiptNumber,curritemID,currqty,userID,'Pending')).then(function(value){
            res.render("stockman_delivery.hbs",{
                message:3
            })
        }) 
    }
})

router.post("/releaseStock",(req,res)=>{
    let quantity = req.body.quantity
    let itemID = req.body.itemID
    let requestID = req.body.requestID
    let action = req.body.action
    
    var empty = false
    
    quantity = quantity.replace(/<[^>]*>/g, '');
    itemID = itemID.replace(/<[^>]*>/g, '');
    requestID = requestID.replace(/<[^>]*>/g, '');

    if(quantity === "" || itemID === "")
        empty = true
    
    if(empty){
        res.render("stockman_release_request.hbs",{
            message:1
        })
    }
    
    else{
        if(action === 'Accept'){
            Promise.resolve(Items.getItemForRelease(itemID)).then(async function(data){
                
                for(let i = 0; i<data.length; i++){
                    let itemQuantity = data[i].quantity 
                    let inventoryID = data[i].inventoryID
                    
                    if(quantity >= itemQuantity){
                        quantity -= itemQuantity
                        itemQuantity = 0
                    }
                    else{
                        itemQuantity -= quantity
                        quantity = 0
                    }
                    await Promise.resolve(Items.setQuantity(itemQuantity,inventoryID))
                    
                    if(quantity == 0)
                        break
                }
                await Promise.resolve(Requests.setReleased(requestID,new Date().toISOString().slice(0, 19).replace('T', ' ')))
            })
            res.render("stockman_release_request.hbs",{
                message:5
            })
        }
        else
            res.redirect("/stockman/requests")
    }
})

module.exports = router;