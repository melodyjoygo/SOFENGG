const Database = require("./database");
var database = new Database();

exports.create = function(supplierID, price, date, status) {
    Promise.resolve(database.query("SELECT COUNT(transactionID) AS 'count' FROM transactions")).then(function(value) {
        database.query("INSERT INTO transactions (transactionID, supplierID, price, date, status) VALUES ?", [[[[(value[0].count + 1),supplierID, price, date, status]]]])
    })
}

exports.getAll = function() {
    return database.query("SELECT * FROM transactions");
}
