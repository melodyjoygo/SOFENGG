const express = require("express");
const router = express.Router();

const Inventory = require("../model/inventory")

router.get("/",(req,res)=>{
    Promise.resolve(Inventory.getAllTableView()).then(function(items){
       res.render("clerk_inventory.hbs",{
            items:items
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

module.exports = router;