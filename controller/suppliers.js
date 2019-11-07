const express = require("express");
const router = express.Router();


const Suppliers = require("../model/suppliers");

function titleCase(str) {
   var splitStr = str.toLowerCase().split(' ');
   for (var i = 0; i < splitStr.length; i++) {
       splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
   }
   return splitStr.join(' '); 
}


router.get("/",(req,res)=>{
    Promise.resolve(Suppliers.getAll()).then(function(value){
        res.render("suppliers.hbs",{
            suppliers:value         
        })
    })
})
router.post("/add",(req,res)=>{
    let supplier = req.body.supplierName
    var exist = false
    var empty = false
    
    if(supplier === "")
        empty = true
    
    if(empty){
        res.render("suppliers.hbs",{
                    message:3
        })
    }
    else{
        Promise.resolve(Suppliers.getAll()).then(function(value){
            for(let i = 0; i < value.length; i++){
                if(supplier.toLowerCase() === value[i].supplierName.toLowerCase()){
                    exist = true
                }
            }
            if(exist){
                res.render("suppliers.hbs",{
                    message:1
                })
            }
            else{
                supplier= titleCase(supplier)
                Promise.resolve(Suppliers.create(supplier)).then(function(value){
                    res.render("suppliers.hbs",{
                        message:2
                    })
                })
            }
        })   
    }
        
})

module.exports = router;