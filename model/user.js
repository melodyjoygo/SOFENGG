const Database = require("./database");
var database = new Database();

exports.create = function(userName,  fullName, email,password, userType) {
    Promise.resolve(database.query("SELECT COUNT(userID) AS 'count' FROM users")).then(function(value) {
        database.query("INSERT INTO users (userID, userName, fullName, email, password, userType) VALUES ?", [[[(value[0].count + 1), userName,fullName,email, password, userType]]])
    })
}

exports.checkuser = function(userName){
    return database.query("SELECT * FROM users WHERE users.userName = ?",[userName]);
}

exports.validate = function(name, password) {
    return database.query("SELECT * FROM users WHERE users.userName = ? AND users.password = ?", [name, password]);
}

exports.getUser = function(name){
    return database.query("SELECT * FROM users WHERE users.userName = ? ", [name]);
}

exports.getAllUsers = function() {
    return database.query("SELECT * FROM users");
}