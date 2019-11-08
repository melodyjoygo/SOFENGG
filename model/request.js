const Database = require("./database");
var database = new Database();

exports.create = function(materialID, materialName, materialType, supplierID, price, edited, approved, requestType, dateRequested) {
    Promise.resolve(database.query("SELECT COUNT(requestID) AS 'count' FROM requests")).then(function(value) {
        database.query("INSERT INTO requests (requestID, materialID, materialName, materialType, supplierID, price, edited, approved, requestType, dateRequested) VALUES ?", [[[[(value[0].count + 1),materialID, materialName, materialType, supplierID, price, edited, approved, requestType, dateRequested]]]])
    })
}

exports.getAll = function() {
    return database.query("SELECT * FROM requests");
}

exports.getAllTableView = function() {
    return database.query("SELECT * FROM requests INNER JOIN users ON requests.userID = users.userID");
}