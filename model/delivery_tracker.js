const Database = require("./database");
var database = new Database();

exports.create = function(deliveryReceptNum,  materialID, quantity,userID) {
    Promise.resolve(database.query("SELECT COUNT(deliveryID) AS 'num' FROM delivery_tracker")).then(function(value) {
        database.query("INSERT INTO delivery_tracker (deliveryID, deliveryReceiptNumber, materialID, quantity,invoiceNumber,poNumber,inInventory,unitPrice,requestID,userID) VALUES ?", [[[(value[0].num + 1), deliveryReceptNum,materialID, quantity, 0,0,0,0,0,userID]]])
    })
}

exports.createSuperAdmin = function(deliveryReceiptNumber,itemID,qty,invoiceNumber,poNumber,unitPrice,userID,count){
    Promise.resolve(database.query("SELECT COUNT(deliveryID) AS 'num' FROM delivery_tracker")).then(function(value) {
        database.query("INSERT INTO delivery_tracker (deliveryID, deliveryReceiptNumber, materialID, quantity,invoiceNumber,poNumber,inInventory,unitPrice,requestID,userID) VALUES ?", [[[(value[0].num + 1), deliveryReceiptNumber,itemID, qty, invoiceNumber,poNumber,0,unitPrice,count,userID]]])
    })
}

exports.getAllWithNoPrice = function(){
    return database.query("SELECT * FROM softengdb.delivery_tracker NATURAL JOIN materials NATURAL JOIN suppliers LEFT JOIN material_types ON materials.materialType = material_types.mtID WHERE invoiceNumber = '0' AND poNumber = '0' AND unitPrice = '0'")
}

exports.update = function(deliveryID,invoiceNumber,poNumber,unitCost){
    database.query("UPDATE delivery_tracker SET invoiceNumber = ?, poNumber = ?, unitPrice = ? WHERE deliveryID = ?",[invoiceNumber,poNumber,unitCost,deliveryID])
}

exports.getAll = function(){
    return database.query("SELECT * FROM softengdb.delivery_tracker NATURAL JOIN materials NATURAL JOIN suppliers LEFT JOIN material_types ON materials.materialType = material_types.mtID")
}

exports.getAllWithPrice = function(){
    return database.query("SELECT * FROM softengdb.delivery_tracker NATURAL JOIN materials NATURAL JOIN suppliers LEFT JOIN material_types ON materials.materialType = material_types.mtID WHERE invoiceNumber != '0' OR poNumber != '0'")
}

exports.edit = function(deliveryID,invoiceNumber,poNumber,unitCost,requestID){
    database.query("UPDATE delivery_tracker SET invoiceNumber = ?, poNumber = ?, unitPrice = ? , requestID = ? WHERE deliveryID = ?",[invoiceNumber,poNumber,unitCost,requestID,deliveryID])
}

exports.getDelivery = function(deliveryID){
    return database.query("SELECT * FROM delivery_tracker WHERE deliveryID = ?",[deliveryID])
}

exports.getStockmanEditable = function(userID){
    return database.query("SELECT *,CASE WHEN inInventory = '0' THEN 'No'ELSE 'Yes' END as status FROM delivery_tracker NATURAL JOIN materials NATURAL JOIN suppliers LEFT JOIN material_types ON materials.materialType = material_types.mtID WHERE userID = ? AND inInventory = '0'",[userID])
}

exports.getClerkEditable = function(userID){
    return database.query("SELECT * FROM softengdb.delivery_tracker NATURAL JOIN materials NATURAL JOIN suppliers LEFT JOIN material_types ON materials.materialType = material_types.mtID LEFT JOIN clerk_add_request ON clerk_add_request.requestID = delivery_tracker.requestID WHERE (invoiceNumber != '0' OR poNumber != '0' OR delivery_tracker.unitPrice != '0') AND inInventory = '0' AND clerk_add_request.status = 'Pending' AND clerk_add_request.userID = ?",[userID])
}

exports.stockmanEdit = function(deliveryID,deliveryReceiptNumber,quantity,newItemID){
    database.query("UPDATE delivery_tracker SET deliveryReceiptNumber = ?, quantity = ?, materialID = ? WHERE deliveryID = ?",[deliveryReceiptNumber,quantity,newItemID,deliveryID])
}

exports.getRequestID = function(deliveryID){
    return database.query("SELECT requestID FROM softengdb.delivery_tracker WHERE deliveryID = ?",[deliveryID])
}

exports.inInventory = function(requestID,inInventory){
    database.query("UPDATE delivery_tracker SET inInventory = ? WHERE requestID = ?",[inInventory,requestID])
}

exports.editAll = function(deliveryReceiptNumber,itemID,quantity,poNumber,invoiceNumber,unitCost,deliveryID){
    database.query("UPDATE delivery_tracker SET deliveryReceiptNumber = ?,materialID = ?,quantity = ?,invoiceNumber = ?,poNumber = ?,unitPrice = ? WHERE deliveryID = ?",[deliveryReceiptNumber,itemID,quantity,invoiceNumber,poNumber,unitCost,deliveryID])
}