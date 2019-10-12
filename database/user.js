const Database = require("./database");
var database = new Database();

exports.create = function(userName,  fullName, password, userType) {
    Promise.resolve(database.query("SELECT COUNT(userID) AS 'count' FROM users")).then(function(value) {
        database.query("INSERT INTO users (userID, userName, fullName, password, userType) VALUES ?", [[[[(value[0].count + 1), userName,fullName, password, userType]]]])
    })
}

exports.validate = function(name, password) {
    return database.query("SELECT * FROM users WHERE users.userName = ? AND users.password = ?", [name, password]);
}

