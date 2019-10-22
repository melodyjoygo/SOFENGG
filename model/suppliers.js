const Database = require("./database");
var database = new Database();

exports.create = function(supplierName) {
    Promise.resolve(database.query("SELECT COUNT(supplierID) AS 'count' FROM suppliers")).then(function(value) {
        database.query("INSERT INTO suppliers (supplierID, supplierName) VALUES ?", [[[(value[0].count + 1), supplierName]]])
    })
}

exports.getAll = function() {
    return database.query("SELECT * FROM suppliers");
}
