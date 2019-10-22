const express = require("express");
const router = express.Router();


const Users = require("../model/user");

router.use("/employees", require("./employees"));
router.use("/clients",require("./clients"))

router.get("/",(req,res)=>{
    res.render("login.hbs")
})

router.post("/login" ,(req,res)=>{
    let un = req.body.un
    let pass = req.body.pw
    
    Promise.resolve(Users.getUser(un)).then(function(value){
        if(value != ''){
            if(pass === value[0].password){
                res.render("dashboard.hbs",{
                })
            }
            else{
                res.render("login.hbs",{
                    error:1
                })
            }
        }
        else{
            res.render("login.hbs",{
                    error:2
                })       
        }
    })
})

router.get("/dashboard",(req,res)=>{
    res.render("dashboard.hbs")
})

router.get("/inventory",(req,res)=>{
    res.render("inventory.hbs")
})

router.get("/requisitions",(req,res)=>{
    res.render("requisitions.hbs")
})


router.get("/clients",(req,res)=>{
    res.render("clients.hbs")
})

router.get("/projects",(req,res)=>{
    res.render("projects.hbs")
})

router.get("/suppliers",(req,res)=>{
    res.render("suppliers.hbs")
})

router.get("/reports",(req,res)=>{
    res.render("reports.hbs")
})


module.exports = router;