const express = require('express')
const router = express.Router()
const JSONToCSV = require('json2csv').parse
const Inventory = require('../model/inventory')
const ip = require("ip")

router.get("/",(req,res)=>{
    Promise.resolve(Inventory.getAllTableView()).then(function(inventory){
        res.render("reports.hbs",{
            userType:req.session.userType,
            inventory:inventory
        })
    })
    
})

router.get("/generateInventory",(req,res)=>{
    let command = req.body.command
    console.log(command)
    if(command == 1){
        let link = "http://"+ip.address()+":3000/reports/generateInventory"
        res.send(link)
    }
    else{
        Promise.resolve(Inventory.generate()).then(function(data){
            const csv = JSONToCSV(data,{fields:["Item ID","Item","Material","Supplier","Quantity","Average Unit Cost","Total Cost"]})
            res.setHeader('Content-disposition','attachment; filename=Inventory Report.csv')
            res.set('Content-Type','text/csv')
            res.send(csv);
        })    
    }
    
})

module.exports = router;