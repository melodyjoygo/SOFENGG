const express = require("express")
const router = express.Router();
const cryptojs = require("crypto-js")

const Requests = require("../model/requests")

router.get("/",(req,res)=>{
    Promise.resolve(Requests.getClerkAddRequests()).then(function(clerkEditRequests){
        Promise.resolve(Requests.getStockmanEditRequests()).then(function(stockmanEditRequests){
            Promise.resolve(Requests.getStockmanReleaseRequests()).then(function(stockmanReleaseRequests){
                res.render("requisitions.hbs",{
                    clerkEditRequests:clerkEditRequests,
                    stockmanEditRequests:stockmanEditRequests,
                    stockmanReleaseRequests:stockmanReleaseRequests
                })
            })
        })
    })
})

router.post("/clerkAdd",(req,res)=>{
    
})

module.exports = router;