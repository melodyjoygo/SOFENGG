const Database = require("./database");
var database = new Database();

exports.create = function(fullName, email,password, userType) {
    Promise.resolve(database.query("SELECT COUNT(userID) AS 'count' FROM users")).then(function(value) {
        database.query("INSERT INTO users (userID,fullName, email, password, userType) VALUES ?", [[[(value[0].count + 1),fullName,email, password, userType]]])
    })
}

exports.checkuser = function(email){
    return database.query("SELECT * FROM users WHERE users.email = ?",[email]);
}

exports.validate = function(name, password) {
    return database.query("SELECT * FROM users WHERE users.userName = ? AND users.password = ?", [name, password]);
}

exports.getUser = function(email){
    return database.query("SELECT * FROM users WHERE users.email = ? ", [email]);
}

exports.getAllUsers = function() {
    return database.query("SELECT * FROM users");
}

exports.edit = function(userID, userName,  fullName, email,password, userType) {
    database.query("UPDATE users SET username = ?, fullname = ?, email = ?, password = ?, userType = ? WHERE userID = ?", [userName,  fullName, email,password, userType, userID]);
 }
 