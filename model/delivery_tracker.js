const Database = require("./database");
var database = new Database();

exports.create = function(deliveryReceptNum,  materialID, quantity, supplierID) {
    Promise.resolve(database.query("SELECT COUNT(deliveryID) AS 'num' FROM delivery_tracker")).then(function(value) {
        database.query("INSERT INTO delivery_tracker (deliveryID, deliveryReceiptNumber, materialID, quantity, supplierID,invoiceNumber) VALUES ?", [[[(value[0].num + 1), deliveryReceptNum,materialID, quantity, supplierID,0]]])
      
    })
}

exports.getAll = function(){
    return database.query("SELECT * from delivery_tracker")
}

