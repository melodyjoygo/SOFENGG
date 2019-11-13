const express = require("express");
const router = express.Router();

const materials = require("../model/materials")
const materialType = require("../model/materials_types")
const Clients = require("../model/clients")
const Suppliers = require("../model/suppliers");
const Inventory = require("../model/inventory");

function titleCase(str) {
   var splitStr = str.toLowerCase().split(' ');
   for (var i = 0; i < splitStr.length; i++) {
       splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
   }
   return splitStr.join(' '); 
}

router.get("/",(req,res)=>{
    Promise.resolve(materialType.getAll()).then(function(types){
        Promise.resolve(Suppliers.getAll()).then(function(suppliers){
            Promise.resolve(Inventory.getAllTableView()).then(function(value){
        
                res.render("inventory.hbs",{
                types:types,
                supplier:suppliers,
                inventory:value
                })
            })
        })
    })
})

router.post("/addItem",(req,res)=>{
    let type = req.body.type
    let itemName = req.body.itemName
    let unit = req.body.unitOfMeasure
    let supplierID = req.body.supplier
    let cost = req.body.unitCost
    var empty = false
    var exist = false
    var count
    
    if(type === "" || itemName === "" || unit === "" || supplierID === "" || cost === "")
        empty = true;
    
    if(empty){
        res.render("inventory.hbs",{
            message:3
        })
    }
    else{
            Promise.resolve(materials.getAll()).then(function(values){
                count = values.length
                for(let i = 0; i < values.length; i++){
                    if((itemName.toLowerCase() === values[i].materialName.toLowerCase()) && (type == values[i].materialType) && (supplierID == values[i].supplierID) && cost == values[i].price)
                       exist = true;
                }
                if(exist){
                    res.render("inventory.hbs",{
                        message:1
                    })  
                }
                else{
                    Promise.resolve(materials.create(itemName,type,supplierID,cost)).then(function(value){        
                        res.render("inventory.hbs",{
                            message:2
                        }) 
                    }) 
                }  
            })
        
      
    }
})

router.post("/addMaterial",(req,res)=>{
    let material = req.body.materialName
    var empty = false
    var exist = false
    if(material === "")
        empty = true;
    
    if(empty){
        res.render("inventory.hbs",{
            message:3
        })
    }
    else{
        Promise.resolve(materialType.getAll()).then(function(value){
            for(let i = 0; i < value.length(); i++){
                if(material.toLowerCase() === value[i].type.toLowerCase())
                    exist = true
            }
        })
        
        if(exist){
            res.render("inventory.hbs",{
                    message:5
            })
        }
        else{
            material = titleCase(material)
            Promise.resolve(materialType.create(material)).then(function(value){
                res.render("inventory.hbs",{
                    message:4
                }) 
            })  
        }
    }
})

module.exports = router;