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
            suppliers:value,
            userType:req.session.userType,
            firstName: req.session.firstName,
            lastName :req.session.lastName,
            currEmail: req.session.email,
            currType: req.session.type,
            password: req.session.password
        })
    })
})
router.post("/add",(req,res)=>{
    let supplier = req.body.supplierName.trim()
    let contactNum = req.body.contactNum.trim()
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
                Promise.resolve(Suppliers.create(supplier,contactNum)).then(function(value){
                    res.render("suppliers.hbs",{
                        message:2
                    })
                })
            }
        })   
    }
})


router.post("/edit", async (req,res)=>{
    let suppID = req.body.suppID
    let supplierName = req.body.supplierName.trim()
    let contactNum = req.body.contactNum
    
    var empty = false
    var exist = false
    if(suppID === "" || supplierName === "" || contactNum === "")
        empty = true
    
    await Promise.resolve(Suppliers.getAll()).then(function(data){
        for(let i = 0; i < data.length; i++){
            if(supplierName.toLowerCase() === data[i].supplierName.toLowerCase())
                if(suppID != data[i].supplierID)
                    exist = true
        }
    })
    
    if(empty){
        res.render("suppliers.hbs",{
            message:3
        })
    }
    else if (exist){
        res.render("suppliers.hbs",{
            message:1
        })
    }
    else{
        Promise.resolve(Suppliers.edit(suppID,supplierName,contactNum)).then(function(value){
            res.render("suppliers.hbs",{
                message:4
            })
        })
    }
})
module.exports = router;