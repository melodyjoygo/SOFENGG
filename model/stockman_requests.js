const Database = require("./database");
var database = new Database();

exports.createEditRequest = function(deliveryID,newDeliveryReceipt,newItemID,newQuantity,newSupplierID,currDeliveryReceipt,currItemID,currQuantity,currSupplierID,userID) {
    Promise.resolve(database.query("SELECT COUNT(requestID) AS 'count' FROM stockman_edit_requests")).then(function(value) {
        database.query("INSERT INTO stockman_edit_requests (requestID, deliveryID,newDeliveryReceipt, newItemID, newQuantity, newSupplierID, currDeliveryReceipt, currItemID, currQuantity, currSupplierID,userID) VALUES ?", [[[(value[0].count + 1),deliveryID,newDeliveryReceipt,newItemID,newQuantity,newSupplierID,currDeliveryReceipt,currItemID,currQuantity,currSupplierID,userID]]])
    })
}


exports.createReleaseRequest = function(projectID,itemID,qty,status,date,userID){
    Promise.resolve(database.query("SELECT COUNT(requestID) AS 'count' FROM stockman_release_requests")).then(function(value) {
        database.query("INSERT INTO stockman_release_requests (requestID, projectID,itemID, qty, status,dateRequested,userID) VALUES ?", [[[(value[0].count + 1),projectID,itemID,qty,status,date,userID]]])
    })
}


exports.getPending = function(){
    return database.query("SELECT * FROM softengdb.stockman_release_requests LEFT JOIN materials on materials.materialID = stockman_release_requests.itemID LEFT JOIN material_types ON materials.materialType = material_types.mtiD LEFT JOIN suppliers ON materials.supplierID = suppliers.supplierID LEFT JOIN projects ON projects.projectID = stockman_release_requests.projectID WHERE stockman_release_requests.status = 'Pending'")
}

exports.getApproved = function(){
    return database.query("SELECT * FROM softengdb.stockman_release_requests LEFT JOIN materials on materials.materialID = stockman_release_requests.itemID LEFT JOIN material_types ON materials.materialType = material_types.mtiD LEFT JOIN suppliers ON materials.supplierID = suppliers.supplierID LEFT JOIN projects ON projects.projectID = stockman_release_requests.projectID WHERE stockman_release_requests.status = 'Approved'")
}