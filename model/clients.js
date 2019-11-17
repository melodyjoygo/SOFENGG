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

exports.getAllTableView = function() {
    return database.query("SELECT clients.clientID,clients.clientName, MAX(projects.dateAdded) AS lastRequestDate FROM softengdb.clients LEFT JOIN softengdb.projects ON clients.clientID = projects.clientID GROUP BY projects.clientID");
}

exports.edit = function(clientID, clientName) {
   database.query("UPDATE clients SET clientName = ? WHERE clientID = ?", [clientName, clientID]);
}
