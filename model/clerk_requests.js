const Database = require("./database");
var database = new Database();

exports.addToInvRequest = function(materialID,quantity,unitPrice,userID,status){
     Promise.resolve(database.query("SELECT COUNT(requestID) AS 'count' FROM clerk_add_request")).then(function(value) {
        database.query("INSERT INTO clerk_add_request (requestID, materialID,quantity,unitPrice,userID,status) VALUES ?", [[[(value[0].count + 1), materialID,quantity,unitPrice,userID,status]]])
    })
}

exports.getCurrRequest = function(){
    return database.query("SELECT COUNT(requestID) AS 'count' FROM clerk_add_request")
}

exports.edit = function(unitPrice,requestID){
    return database.query("UPDATE clerk_add_request SET unitPrice = ? WHERE requestID = ?",[unitPrice,requestID])
}
 
exports.updateStatus = function(requestID,status){
    return database.query("UPDATE clerk_add_request SET status = ? WHERE requestID = ?",[status,requestID])
}

exports.editAddToInv = function(requestID,materialID,quantity){
    database.query("UPDATE clerk_add_request SET materialID = ?,quantity = ? WHERE requestID = ?",[materialID,quantity,requestID])
}