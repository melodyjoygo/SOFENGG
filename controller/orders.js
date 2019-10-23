const express = require("express")
const router = express.Router()

const Items = require("../model/transaction")
const Materials = require("../model/materials")

router.get("/",(req,res)=>{
    Promise.resolve(Items.loadItems()).then(function(items){
        res.render("order.hbs",{
            items:items
        })
    })
})

router.post("/add",(req,res)=>{
    let qty = req.body.qty
    let cost = req.body.unitcost
    let itemID = req.body.item
    var empty = false
    
    if(qty === "" || cost === "" || itemID === "")
        empty = true
    
    if(empty){
        res.render("order.hbs",{
            message:1
        })
    }
    else{
        Promise.resolve(Materials.findItem(itemID)).then(function(value){
            Promise.resolve(Items.create(value[0].supplierID,value[0].materialID,cost,new Date().toISOString().slice(0, 19).replace('T', ' '),'Pending',qty)).then(function(value){
                res.render("order.hbs",{
                    message:2
                })  
            })
        })
    }
})


module.exports = router