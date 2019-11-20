const Database = require("./database");
var database = new Database();

exports.create = function(deliveryReceptNum,  materialID, quantity) {
    Promise.resolve(database.query("SELECT COUNT(deliveryID) AS 'num' FROM delivery_tracker")).then(function(value) {
        database.query("INSERT INTO delivery_tracker (deliveryID, deliveryReceiptNumber, materialID, quantity,invoiceNumber,poNumber,inInventory,unitPrice,requestID) VALUES ?", [[[(value[0].num + 1), deliveryReceptNum,materialID, quantity, 0,0,0,0,0]]])
      
    })
}

exports.getAllWithNoPrice = function(){
    return database.query("SELECT * FROM softengdb.delivery_tracker NATURAL JOIN materials NATURAL JOIN suppliers LEFT JOIN material_types ON materials.materialType = material_types.mtID WHERE invoiceNumber = '0' AND poNumber = '0'")
}

exports.update = function(deliveryID,invoiceNumber,poNumber,unitCost){
    database.query("UPDATE delivery_tracker SET invoiceNumber = ?, poNumber = ?, unitPrice = ? WHERE deliveryID = ?",[invoiceNumber,poNumber,unitCost,deliveryID])
}

exports.getAll = function(){
    return database.query("SELECT * FROM softengdb.delivery_tracker NATURAL JOIN materials NATURAL JOIN suppliers LEFT JOIN material_types ON materials.materialType = material_types.mtID")
}

exports.getAllWithPrice = function(){
    return database.query("SELECT * FROM softengdb.delivery_tracker NATURAL JOIN materials NATURAL JOIN suppliers LEFT JOIN material_types ON materials.materialType = material_types.mtID WHERE invoiceNumber != '0' AND poNumber != '0'")
}

exports.edit = function(deliveryID,invoiceNumber,poNumber,unitCost,requestID){
    database.query("UPDATE delivery_tracker SET invoiceNumber = ?, poNumber = ?, unitPrice = ? , requestID = ? WHERE deliveryID = ?",[invoiceNumber,poNumber,unitCost,requestID,deliveryID])
}