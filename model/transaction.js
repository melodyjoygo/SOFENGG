const Database = require("./database");
var database = new Database();

exports.create = function(supplierID,materialID ,price, date, status,quantity,poNumber) {
    Promise.resolve(database.query("SELECT COUNT(transactionID) AS 'count' FROM transactions")).then(function(value) {
        database.query("INSERT INTO transactions (transactionID,materialID, supplierID, price, date, status,quantity,poNumber) VALUES ?", [[[(value[0].count + 1),materialID,supplierID, price, date, status,quantity,poNumber]]])
    })
}

exports.getAll = function() {
    return database.query("SELECT * FROM transactions");
}


exports.loadItems = function(){
    return database.query("SELECT *,date_format(date,'%Y-%m-%d') as 'dateFormat' FROM transactions NATURAL JOIN suppliers NATURAL JOIN materials LEFT JOIN material_types ON materials.materialType = material_types.mtID")
}

exports.edit = function(materialID,supplierID,price,quantity,transactionID,poNumber){
    database.query("UPDATE transactions SET materialID = ?, supplierID = ?, price = ? ,quantity = ? ,poNumber = ? WHERE transactionID = ?",[materialID,supplierID,price,quantity,poNumber,transactionID])
}

exports.arrived = function(materialID,quantity,unitPrice,poNumber){
    database.query("UPDATE transactions SET status = 'Arrived' WHERE price = ? AND materialID = ? AND poNumber = ? AND quantity = ?",[unitPrice,materialID,poNumber,quantity])
}