const Database = require("./database");
var database = new Database();

exports.createEditRequest = function(deliveryID,newDeliveryReceipt,newItemID,newQuantity,newSupplierID,currDeliveryReceipt,currItemID,currQuantity,currSupplierID) {
    Promise.resolve(database.query("SELECT COUNT(requestID) AS 'count' FROM stockman_edit_requests")).then(function(value) {
        database.query("INSERT INTO stockman_edit_requests (requestID, deliveryID,newDeliveryReceipt, newItemID, newQuantity, newSupplierID, currDeliveryReceipt, currItemID, currQuantity, currSupplierID) VALUES ?", [[[(value[0].count + 1),deliveryID,newDeliveryReceipt,newItemID,newQuantity,newSupplierID,currDeliveryReceipt,currItemID,currQuantity,currSupplierID]]])
    })
}


exports.createReleaseRequest = function(projectID,itemID,qty,status){
    Promise.resolve(database.query("SELECT COUNT(requestID) AS 'count' FROM stockman_release_requests")).then(function(value) {
        database.query("INSERT INTO stockman_release_requests (requestID, projectID,itemID, qty, status) VALUES ?", [[[(value[0].count + 1),projectID,itemID,qty,status]]])
    })
}
