const Database = require("./database");
var database = new Database();

exports.create = function(supplierID,materialID ,price, date, status,quantity) {
    Promise.resolve(database.query("SELECT COUNT(transactionID) AS 'count' FROM transactions")).then(function(value) {
        database.query("INSERT INTO transactions (transactionID,materialID, supplierID, price, date, status,quantity) VALUES ?", [[[(value[0].count + 1),materialID,supplierID, price, date, status,quantity]]])
    })
}

exports.getAll = function() {
    return database.query("SELECT * FROM transactions");
}


exports.loadItems = function(){
    return database.query("SELECT * FROM softengdb.materials LEFT JOIN softengdb.material_types ON softengdb.materials.materialType = softengdb.material_types.mtID LEFT JOIN softengdb.suppliers ON softengdb.materials.supplierID = softengdb.suppliers.supplierID")
}
