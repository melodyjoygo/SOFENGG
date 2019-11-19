const Database = require("./database");
var database = new Database();

exports.create = function(fname,lname, email,password, userType) {
    Promise.resolve(database.query("SELECT COUNT(userID) AS 'count' FROM users")).then(function(value) {
        database.query("INSERT INTO users (userID,firstName, lastName ,email, password, userType) VALUES ?", [[[(value[0].count + 1),fname,lname,email, password, userType]]])
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

exports.getAllTableView = function() {
    return database.query("SELECT userID,userType,utID,type,email, concat(" + "firstName, ' ', lastname" + ") as fullName FROM users LEFT JOIN user_types ON users.userType = user_types.utID");
}

exports.edit = function(userID, fname,lname, email,userType) {
    database.query("UPDATE users SET firstName = ?, lastName = ?, email = ? , userType = ? WHERE userID = ?", [fname, lname, email, userType, userID]);
 }
 