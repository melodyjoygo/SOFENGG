const Database = require("./database");
var database = new Database();

exports.create = function(deliveryReceptNum,  materialID, quantity, supplierID) {
    Promise.resolve(database.query("SELECT COUNT(deliveryID) AS 'num' FROM delivery_tracker")).then(function(value) {
        database.query("INSERT INTO delivery_tracker (deliveryID, deliveryReceiptNumber, materialID, quantity, supplierID,invoiceNumber) VALUES ?", [[[(value[0].num + 1), deliveryReceptNum,materialID, quantity, supplierID,0]]])
      
    })
}

exports.getAll = function(){
    return database.query("SELECT * FROM softengdb.delivery_tracker NATURAL JOIN materials NATURAL JOIN suppliers LEFT JOIN material_types ON materials.materialType = material_types.mtID")
}

