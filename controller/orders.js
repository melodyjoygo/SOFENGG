const express = require("express")
const router = express.Router()

const Items = require("../model/transaction")
const Materials = require("../model/materials")

router.get("/",(req,res)=>{
    Promise.resolve(Materials.getAllWithSupplier()).then(function(items){
        Promise.resolve(Items.loadItems()).then(function(orders){
            res.render("order.hbs",{
                items:items,
                orders:orders,
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

router.post("/add",(req,res)=>{
    let qty = req.body.qty
    let cost = req.body.unitcost
    let itemID = req.body.item
    let poNumber = req.body.poNumber
    var empty = false
    
    if(qty === "" || cost === "" || itemID === "" || poNumber === "")
        empty = true
    
    if(empty){
        res.render("order.hbs",{
            message:1
        })
    }
    else{
        Promise.resolve(Materials.findItem(itemID)).then(function(value){
            Promise.resolve(Items.create(value[0].supplierID,value[0].materialID,cost,new Date().toISOString().slice(0, 19).replace('T', ' '),'Pending',qty,poNumber)).then(function(value){
                res.render("order.hbs",{
                    message:2
                })  
            })
        })
    }
})

router.post("/edit",(req,res)=>{
    let transactionID = req.body.transactionID
    let itemID = req.body.itemID
    let qty = req.body.qty
    let unitcost = req.body.unitcost
    let poNumber = req.body.poNumber
    
    var empty = false
    
    if(transactionID === "" || itemID === "" || qty === "" || unitcost === "" || poNumber === "")
        empty = true
    
    if(empty){
        res.render("order.hbs",{
            message:1
        })
    }
    else{
        Promise.resolve(Materials.getSupplier(itemID)).then(function(value){
            Promise.resolve(Items.edit(itemID,value[0].supplierID,unitcost,qty,transactionID,poNumber)).then(function(data){
                res.render("order.hbs",{
                    message:3
                })
            })
        })
        
    }
})
module.exports = router