const Database = require("./database");
var database = new Database();

exports.createEditRequest = function(deliveryID,newDeliveryReceipt,newItemID,newQuantity,newSupplierID,currDeliveryReceipt,currItemID,currQuantity,currSupplierID,userID,status) {
    Promise.resolve(database.query("SELECT COUNT(requestID) AS 'count' FROM stockman_edit_requests")).then(function(value) {
        database.query("INSERT INTO stockman_edit_requests (requestID, deliveryID,newDeliveryReceipt, newItemID, newQuantity, newSupplierID, currDeliveryReceipt, currItemID, currQuantity, currSupplierID,userID,status) VALUES ?", [[[(value[0].count + 1),deliveryID,newDeliveryReceipt,newItemID,newQuantity,newSupplierID,currDeliveryReceipt,currItemID,currQuantity,currSupplierID,userID,status]]])
    })
}


exports.createReleaseRequest = function(projectID,itemID,qty,status,date,userID){
    Promise.resolve(database.query("SELECT COUNT(requestID) AS 'count' FROM stockman_release_requests")).then(function(value) {
        database.query("INSERT INTO stockman_release_requests (requestID, projectID,itemID, qty, status,dateRequested,userID,released) VALUES ?", [[[(value[0].count + 1),projectID,itemID,qty,status,date,userID,0]]])
    })
}


exports.getPending = function(userID){
    return database.query("SELECT * FROM softengdb.stockman_release_requests LEFT JOIN materials on materials.materialID = stockman_release_requests.itemID LEFT JOIN material_types ON materials.materialType = material_types.mtiD LEFT JOIN suppliers ON materials.supplierID = suppliers.supplierID LEFT JOIN projects ON projects.projectID = stockman_release_requests.projectID WHERE stockman_release_requests.status = 'Pending' AND stockman_release_requests.userID = ?",[userID])
}

exports.getApproved = function(userID){
    return database.query("SELECT * FROM softengdb.stockman_release_requests LEFT JOIN materials on materials.materialID = stockman_release_requests.itemID LEFT JOIN material_types ON materials.materialType = material_types.mtiD LEFT JOIN suppliers ON materials.supplierID = suppliers.supplierID LEFT JOIN projects ON projects.projectID = stockman_release_requests.projectID WHERE stockman_release_requests.status = 'Approved' AND released = '0' AND stockman_release_requests.userID = ?",[userID])
}

exports.changeEditStatus = function(requestID,status){
    database.query("UPDATE stockman_edit_requests SET status = ? WHERE requestID = ?",[status,requestID])
}

exports.changeReleaseStatus = function(requestID,status){
     database.query("UPDATE stockman_release_requests SET status = ? WHERE requestID = ?",[status,requestID])
}

exports.setReleased = function(requestID,dateReleased){
     database.query("UPDATE stockman_release_requests SET released = 1, dateReleased = ? WHERE requestID = ?",[dateReleased,requestID])
}

exports.getYears = function(){
    return database.query("SELECT DISTINCT YEAR(dateReleased) AS 'years' from stockman_release_requests ORDER BY years ASC")
}

exports.getReleased = function(month,year){
    return database.query("SELECT *,date_format(dateReleased, '%Y-%m-%d') AS 'date' FROM softengdb.stockman_release_requests LEFT JOIN materials ON materials.materialID = stockman_release_requests.itemID LEFT JOIN material_types ON materials.materialType = material_types.mtID LEFT JOIN projects ON projects.projectID = stockman_release_requests.projectID WHERE YEAR(dateReleased) = ? AND MONTH(dateReleased) = ?",[year,month])
}

exports.getReleasedAllMonth = function(year){
    return database.query("SELECT *,date_format(dateReleased, '%Y-%m-%d') AS 'date' FROM softengdb.stockman_release_requests LEFT JOIN materials ON materials.materialID = stockman_release_requests.itemID LEFT JOIN material_types ON materials.materialType = material_types.mtID LEFT JOIN projects ON projects.projectID = stockman_release_requests.projectID WHERE YEAR(dateReleased) = ?",[year])
}