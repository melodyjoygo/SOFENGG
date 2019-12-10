const express = require("express")
const router = express.Router();
const cryptojs = require("crypto-js")
const Inventory = require("../model/inventory");
const Projects = require("../model/projects");

const Users = require("../model/user")
const key = "password_key"
router.use(function(req, res, next) {
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0')
  next()
})
router.use("/employees", loginRequired,require("./employees"))
router.use("/clients",loginRequired,require("./clients"))
router.use("/suppliers",loginRequired,require("./suppliers"))
router.use("/projects",loginRequired,require("./projects"))
router.use("/inventory",loginRequired,require("./inventory"))
router.use("/orders",loginRequired,require("./orders"))
router.use("/requisitions",loginRequired,require("./requisitions"))
router.use("/delivery_tracker",loginRequired,require("./delivery_tracker"))

router.use("/stockman",checkStockman,require("./stockman"))
router.use("/clerk",checkClerk,require("./clerk"))

router.get("/",checkExisting,(req,res)=>{
    res.render("login.hbs")
})

router.post("/login" ,(req,res)=>{
    let email = req.body.email
    let pass = req.body.pw
    let empty = false;
    
    if(email === "" || pass === "")
        empty = true;
    
    if(empty){
        res.render("login.hbs",{
                    error:3
                })  
    }
    else {
        Promise.resolve(Users.getUser(email)).then(function(value){
            if(value != ''){
                var phash = cryptojs.AES.decrypt(value[0].password,key)
                var pnormal = phash.toString(cryptojs.enc.Utf8)
                if(pass != pnormal){
                    res.render("login.hbs",{
                        error:1
                    })   
                }
                else{
                    console.log("User ID Before : " + req.session.userID)
                    console.log("User Type Before : " + req.session.userType)
                    if(typeof req.session.userID === "undefined"){
                        console.log("Adding Current USER ID")
                        req.session.userID = value[0].userID
                        req.session.userType = value[0].userType
                        req.session.firstName = value[0].firstName
                        req.session.lastName = value[0].lastName
                        req.session.email = value[0].email
                        req.session.password = pnormal
                        req.session.type = value[0].type
                    }
                    console.log("User ID After : " + req.session.userID)
                    console.log("User Type After : " + req.session.userType)
                    switch(req.session.userType){
                        case 0 : res.redirect("/dashboard")
                        break
                        case 1 : res.redirect("/dashboard")
                        break
                        case 2 : res.redirect("/dashboard")
                        break
                        case 3 : res.redirect("/clerk")
                        break
                        case 4 : res.redirect("/stockman")
                        break
                            
                    } 
                }   
            }
            else{
                res.render("login.hbs",{
                        error:2
                })       
            }
        })  
    }
        
})

router.post("/editAccount",(req,res)=>{
    let id = req.session.userID
    let fname = req.body.fname.trim()
    let lname = req.body.lname.trim()
    let email = req.body.email.trim()
    let pass = req.body.password.trim()
    let conf = req.body.confpassword.trim()
    
    let empty = false
    let notvalid = false
    var regx = /^([a-z A-Z 0-9\.-_]+)@([a-z A-Z 0-9-]+).([a-z A-Z]{2,8})(.[a-z A-Z]{2,8})$/
    
    if(fname === ""  || lname === "" || email === "" || pass === "" || conf === "")
        empty = true
    
    if(!regx.test(email)){
        notvalid = true   
    }
    
    if(empty){
        res.send("empty")
    }
    else if(notvalid){
         res.send("invalid")
    }
    else{
        Promise.resolve(Users.checkuser(email)).then(function(value){
            if(value != ''){
                if(value[0].userID != id){
                    res.send("exist")
                }
                else{
                    Promise.resolve(Users.editAccount(id,fname,lname,email,cryptojs.AES.encrypt(pass,"password_key").toString())).then(function(value){
                        req.session.firstName = fname
                        req.session.lastName = lname
                        req.session.email = email
                        req.session.password = pass
                        res.send("success")
                    }) 
                }
            }
            else{
               Promise.resolve(Users.editAccount(id,fname,lname,email,cryptojs.AES.encrypt(pass,"password_key").toString())).then(function(value){
                    req.session.firstName = fname
                    req.session.lastName = lname
                    req.session.email = email
                    req.session.password = pass 
                    res.send("success")
                }) 
            }

        })  
    }
})

router.get("/logout",(req,res)=>{
    req.session.destroy();
    res.redirect("/")
})

router.get("/dashboard",loginRequired,(req,res)=>{
    Promise.resolve(Inventory.getLowOnStock()).then(function(items){
        Promise.resolve(Projects.getAllTableView()).then(function(projects){
            Promise.resolve(Projects.getProjectCount()).then(function(projectsCounts){
            res.render("dashboard.hbs",{
                firstName: req.session.firstName,
                lastName :req.session.lastName,
                currEmail: req.session.email,
                currType: req.session.type,
                password: req.session.password,
                items:items,
                projects:projects,
                projectsCounts:projectsCounts
            })
        })
        
    })
    })
    
})

router.get("/reports",loginRequired,(req,res)=>{
    res.render("reports.hbs")
})

router.get("/handleMissing",(req,res)=>{
    if(req.session.userType == 0 || req.session.userType == 1 || req.session.userType == 2)
        res.redirect("/dashboard")
    else if(req.session.userType == 3)
        res.redirect("/clerk")
    else if(req.session.userType == 4)
        res.redirect("/stockman")
    else
        res.redirect("/")
})

router.get("*",(req,res)=>{
    res.render("404.hbs")
})

function checkExisting(req,res,next){
    if(req.session.userType || req.session.userType == 0){
        if(req.session.userType == 0 || req.session.userType == 1 || req.session.userType == 2)
            res.redirect("/dashboard")
         else if(req.session.userType == 3)
            res.redirect("/clerk")
         else if(req.session.userType == 4)
            res.redirect("/stockman")
    }
    else{
        next();
    }
}

function loginRequired(req,res,next){
    if(req.session.userType || req.session.userType == 0){
        if(req.session.userType == 0 || req.session.userType == 1 || req.session.userType == 2)
            next();
         else if(req.session.userType == 3)
            res.redirect("/clerk")
         else if(req.session.userType == 4)
            res.redirect("/stockman")
    }
    else{
        res.redirect("/")
    }
}

function checkClerk(req,res,next){
    if(req.session.userType || req.session.userType == 0){
        if(req.session.userType == 0 || req.session.userType == 1 || req.session.userType == 2)
            res.redirect("/dashboard")
         else if(req.session.userType == 3)
            next();
         else if(req.session.userType == 4)
            res.redirect("/stockman")
    }
    else{
        res.redirect("/")
    }
}

function checkStockman(req,res,next){
    if(req.session.userType || req.session.userType == 0){
        if(req.session.userType == 0 || req.session.userType == 1 || req.session.userType == 2)
            res.redirect("/dashboard")
         else if(req.session.userType == 3)
            res.redirect("/clerk")
         else if(req.session.userType == 4)
            next();
    }
    else{
        res.redirect("/")
    }
}

module.exports = router;

