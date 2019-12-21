const express = require('express')
const router = express.Router()
const JSONToCSV = require('json2csv').parse
const Inventory = require('../model/inventory')
const Materials = require("../model/materials")
const Purchases = require("../model/transaction")
const Releases = require("../model/stockman_requests")
const Suppliers = require("../model/suppliers")
const Projects = require("../model/projects")
const Reports = require("../model/reports")
const ip = require("ip")

var dateObj = new Date();
var month = dateObj.getUTCMonth() + 1;
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();

newdate = year + "-" + month + "-" + day;

router.get("/",(req,res)=>{
    Promise.resolve(Inventory.getAllTableView()).then(function(inventory){
        Promise.resolve(Materials.getAllWithSupplier()).then(function(items){
            Promise.resolve(Purchases.loadItems()).then(function(purchases){
                Promise.resolve(Releases.loadReleased()).then(function(released){
                    res.render("reports.hbs",{
                        userType:req.session.userType,
                        inventory:inventory,
                        items:items,
                        purchases:purchases,
                        released:released,
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

router.get("/generateInventory",(req,res)=>{
    let itemID = req.query.itemID
    console.log(itemID)
    if(itemID != "all"){
        Promise.resolve(Reports.generateSpecificInventory(itemID)).then(function(data){
            const csv = JSONToCSV(data,{fields:["Item ID","Item Name","Material","Supplier","Quantity","Unit Cost","Total Cost"]})
            res.setHeader('Content-disposition','attachment; filename=Inventory Item Report '+newdate+'.csv')
            res.set('Content-Type','text/csv')
            res.send(csv);
        })
    }
    else{
        Promise.resolve(Reports.generateAllInventory()).then(function(data){
            const csv = JSONToCSV(data,{fields:["Item ID","Item","Material","Supplier","Quantity","Average Unit Cost","Total Cost"]})
            res.setHeader('Content-disposition','attachment; filename=All Inventory Item Report '+newdate+'.csv')
            res.set('Content-Type','text/csv')
            res.send(csv);
        })    
    }
    
})

router.post("/getInventoryView",(req,res)=>{
    let itemID = req.body.itemID;
    
    if(itemID == "all"){
        Promise.resolve(Inventory.getAllTableView()).then(function(data){
            res.send(data)
        })
    }
    else{
        Promise.resolve(Inventory.getItem(itemID)).then(function(data){
            res.send(data)
        })
    }
})

router.get("/generatePurchases",(req,res)=>{
    let date1 = req.query.date1
    let date2 = req.query.date2
    let itemID = req.query.itemID

    if(date1 !== "" && date2 !== ""){
        if(itemID == "all"){
            Promise.resolve(Reports.generateAllTransactionWithDate(date1,date2)).then(function(data){
                const csv = JSONToCSV(data,{fields:["Transaction ID","Item","Material","Supplier","Quantity","Unit Price","Date Ordered"]})
                res.setHeader('Content-disposition','attachment; filename=All Purchases Report from ('+date1+' - '+ date2 +').csv')
                res.set('Content-Type','text/csv')
                res.send(csv)
            })
        }
        else{
            Promise.resolve(Reports.generateSpecificTransactionWithDate(itemID,date1,date2)).then(function(data){
                const csv = JSONToCSV(data,{fields:["Transaction ID","Item","Material","Supplier","Quantity","Unit Price","Date Ordered"]})
                res.setHeader('Content-disposition','attachment; filename=Item '+itemID+' Purchases Report from ('+date1+' - '+ date2 +').csv')
                res.set('Content-Type','text/csv')
                res.send(csv)
            })
        }
    }
    else{
        if(itemID == "all"){
            Promise.resolve(Reports.generateAllTransaction()).then(function(data){
                const csv = JSONToCSV(data,{fields:["Transaction ID","Item","Material","Supplier","Quantity","Unit Price","Date Ordered"]})
                res.setHeader('Content-disposition','attachment; filename=All Purchases Report.csv')
                res.set('Content-Type','text/csv')
                res.send(csv)
            })
        }
        else{
            Promise.resolve(Reports.generateSpecificTransacion(itemID)).then(function(data){
                const csv = JSONToCSV(data,{fields:["Transaction ID","Item","Material","Supplier","Quantity","Unit Price","Date Ordered"]})
                res.setHeader('Content-disposition','attachment; filename=Item '+itemID+' Purchases Report.csv')
                res.set('Content-Type','text/csv')
                res.send(csv)
            })
        }
    }
})

router.post("/getPurchasesView",(req,res)=>{
    let date1 = req.body.date1
    let date2 = req.body.date2
    let itemID = req.body.itemID
    
    if(date1 !== "" && date2 !== ""){
        if(itemID == "all"){
            Promise.resolve(Purchases.getAllWithDate(date1,date2)).then(function(data){
                res.send(data)
            })
        }
        else{
            Promise.resolve(Purchases.getSpecificWithDate(itemID,date1,date2)).then(function(data){
                res.send(data)
            })
        }
    }
    else{
        if(itemID == "all"){
            Promise.resolve(Purchases.loadItems()).then(function(data){
                res.send(data)
            })
        }
        else{
            Promise.resolve(Purchases.getItem(itemID)).then(function(data){
                res.send(data)
            })
        }
    }
})

router.get("/getProjects",(req,res)=>{
    Promise.resolve(Projects.getAll()).then(function(data){
        res.send(data)
    })
})

router.get("/getItems",(req,res)=>{
    Promise.resolve(Materials.getAllWithSupplier()).then(function(data){
        res.send(data)
    })
})

router.get("/getSuppliers",(req,res)=>{
    Promise.resolve(Suppliers.getAll()).then(function(data){
        res.send(data)
    })
})

router.post("/releasedProjects",(req,res)=>{
    let date1 = req.body.date1
    let date2 = req.body.date2
    let choiceID = req.body.choiceID

    if(date1 !== "" && date2 !== ""){
        Promise.resolve(Releases.getProjectWithDate(date1,date2,choiceID)).then(function(data){
            res.send(data)
        })
    }
    else{
        Promise.resolve(Releases.getProjectWithoutDate(choiceID)).then(function(data){
            res.send(data)
        })
    }
})

router.post("/releasedItems",(req,res)=>{
    let date1 = req.body.date1
    let date2 = req.body.date2
    let choiceID = req.body.choiceID

    if(date1 !== "" && date2 !== ""){
        if(choiceID == 'all'){
            Promise.resolve(Releases.getAllItemWithDate(date1,date2)).then(function(data){
                res.send(data)
            })
        }
        else{
            Promise.resolve(Releases.getSpecificItemWithDate(date1,date2,choiceID)).then(function(data){
                res.send(data)
            })
        }
        
    }
    else{
        if(choiceID == 'all'){
            Promise.resolve(Releases.loadReleased()).then(function(data){
                res.send(data)
            })
        }
        else{
            Promise.resolve(Releases.getSpecificItemWithoutDate(choiceID)).then(function(data){
                res.send(data)
            })
        }
    }
})

router.post("/releasedSuppliers",(req,res)=>{
    let date1 = req.body.date1
    let date2 = req.body.date2
    let choiceID = req.body.choiceID

    if(date1 !== "" && date2 !== ""){
        Promise.resolve(Releases.getSupplierWithDate(date1,date2,choiceID)).then(function(data){
            res.send(data)
        })
    }
    else{
        Promise.resolve(Releases.getSupplierWithoutDate(choiceID)).then(function(data){
            res.send(data)
        })
    }
})


router.get("/generateReleased",(req,res)=>{
    let category = req.query.category
    let date1 = req.query.date1
    let date2 = req.query.date2
    let choiceID = req.query.choiceID

    if(category == "1"){
        if(date1 !== "" && date2 !== ""){
            Promise.resolve(Reports.generateProjectWithDate(date1,date2,choiceID)).then(function(data){
                const csv = JSONToCSV(data,{fields:["Item","Material","Supplier","Quantity","Project","Date Released"]})
                res.setHeader('Content-disposition','attachment; filename=Project '+ choiceID +' Release report from ('+date1+' - '+ date2 +').csv')
                res.set('Content-Type','text/csv')
                res.send(csv)
            })
        }
        else{
            Promise.resolve(Reports.generateProjectWithoutDate(choiceID)).then(function(data){
                const csv = JSONToCSV(data,{fields:["Item","Material","Supplier","Quantity","Project","Date Released"]})
                res.setHeader('Content-disposition','attachment; filename=Project '+ choiceID +' Release Report.csv')
                res.set('Content-Type','text/csv')
                res.send(csv)
            })
        }
    }
    else if(category == "2"){
        if(date1 !== "" && date2 !== ""){
            if(choiceID == 'all'){
                Promise.resolve(Reports.generateAllItemWithDate(date1,date2)).then(function(data){
                    const csv = JSONToCSV(data,{fields:["Item","Material","Supplier","Quantity","Project","Date Released"]})
                    res.setHeader('Content-disposition','attachment; filename=All Released Items Report from ('+date1+' - '+ date2 +').csv')
                    res.set('Content-Type','text/csv')
                    res.send(csv)
                })
            }
            else{
                Promise.resolve(Reports.generateSpecificItemWithDate(date1,date2,choiceID)).then(function(data){
                    const csv = JSONToCSV(data,{fields:["Item","Material","Supplier","Quantity","Project","Date Released"]})
                    res.setHeader('Content-disposition','attachment; filename=Item '+ choiceID +' Release Report from ('+date1+' - '+ date2 +').csv')
                    res.set('Content-Type','text/csv')
                    res.send(csv)
                })
            }
            
        }
        else{
            if(choiceID == 'all'){
                Promise.resolve(Reports.generateAllItemWithoutDate()).then(function(data){
                    const csv = JSONToCSV(data,{fields:["Item","Material","Supplier","Quantity","Project","Date Released"]})
                    res.setHeader('Content-disposition','attachment; filename=All Released Items Report.csv')
                    res.set('Content-Type','text/csv')
                    res.send(csv)
                })
            }
            else{
                Promise.resolve(Reports.generateSpecificItemWithoutDate(choiceID)).then(function(data){
                    const csv = JSONToCSV(data,{fields:["Item","Material","Supplier","Quantity","Project","Date Released"]})
                    res.setHeader('Content-disposition','attachment; filename=Item '+choiceID+' Release Report.csv')
                    res.set('Content-Type','text/csv')
                    res.send(csv)
                })
            }
        }
    }
    else if(category == "3"){
        if(date1 !== "" && date2 !== ""){
            Promise.resolve(Reports.generateSupplierWithDate(date1,date2,choiceID)).then(function(data){
                const csv = JSONToCSV(data,{fields:["Item","Material","Supplier","Quantity","Project","Date Released"]})
                res.setHeader('Content-disposition','attachment; filename=Supplier'+choiceID+' Release Report from ('+date1+' - '+ date2 +').csv')
                res.set('Content-Type','text/csv')
                res.send(csv)
            })
        }
        else{
            Promise.resolve(Reports.generateSupplierWithoutDate(choiceID)).then(function(data){
                const csv = JSONToCSV(data,{fields:["Item","Material","Supplier","Quantity","Project","Date Released"]})
                res.setHeader('Content-disposition','attachment; filename=Supplier '+choiceID+' Release Report.csv')
                res.set('Content-Type','text/csv')
                res.send(csv)
            })
        }
    }

})
module.exports = router;