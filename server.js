const express = require("express")
const session = require("express-session")
const bodyparser = require("body-parser")
const hbs = require("hbs")
const url = require("url")
const cryptojs = require("crypto-js")
const ip = require("ip");

const app = new express();
var path = require("path");

app.use(express.static(path.join(__dirname, "/public")));

app.use(session({
    resave : true,
    name :"uprising",
    saveUninitialized : true,
    secret : "secretpass",
    cookie : {
        maxAge: 10*60*60*1000
    }
}));

const urlencoder = bodyparser.urlencoded({
    extended: false
})
app.use(urlencoder)
app.set('view engine','hbs')
app.set('views',path.join(__dirname,'views'))
app.use(require("./controller"))

app.listen(3000,()=>{
    console.log ( "Server Has Started" );
    console.log ( "Please enter the following link to access website : " + ip.address()+":3000" );
})