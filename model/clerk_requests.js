const Database = require("./database");
var database = new Database();

exports.addToInvRequest = function(materialID,quantity,unitPrice,userID){
     Promise.resolve(database.query("SELECT COUNT(requestID) AS 'count' FROM clerk_add_request")).then(function(value) {
        database.query("INSERT INTO clerk_add_request (requestID, materialID,quantity,unitPrice,userID) VALUES ?", [[[(value[0].count + 1), materialID,quantity,unitPrice,userID]]])
    })
}

exports.getCurrRequest = function(){
    return database.query("SELECT COUNT(requestID) AS 'count' FROM clerk_add_request")
}

exports.edit = function(unitPrice,requestID){
    return database.query("UPDATE clerk_add_request SET unitPrice = ? WHERE requestID = ?",[unitPrice,requestID])
}
 