const Database = require("./database");
var database = new Database();

exports.count = function(){
    return database.query("SELECT * FROM materials WHERE materials.materialName = ? AND materials.materialType = ? AND materials.supplierID = ? AND materials.price = ?",[itemName,type,supplierID,cost])
}

exports.create = function(materialName,  materialType, supplierID, price) {
    Promise.resolve(database.query("SELECT COUNT(materialID) AS 'count' FROM materials")).then(function(value) {
        database.query("INSERT INTO materials (materialID, materialName, materialType, supplierID, price) VALUES ?", [[[(value[0].count + 1), materialName,materialType, supplierID, price]]])
      
    })
}

exports.getAll = function() {
    return database.query("SELECT * FROM materials");
}

