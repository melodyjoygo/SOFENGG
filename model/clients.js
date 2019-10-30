const Database = require("./database");
var database = new Database();

exports.create = function(clientName) {
    Promise.resolve(database.query("SELECT COUNT(clientID) AS 'count' FROM clients")).then(function(value) {
        database.query("INSERT INTO clients (clientID, clientName) VALUES ?", [[[(value[0].count + 1), clientName]]])
    })
}


exports.getAll = function() {
    return database.query("SELECT * FROM clients");
}

exports.edit = function(clientID, clientName) {
   database.query("UPDATE clients SET clientName = ? WHERE clientID = ?", [clientName, clientID]);
}
