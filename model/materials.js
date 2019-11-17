const Database = require("./database");
var database = new Database();


exports.create = function(materialName,  materialType, supplierID, unit) {
    Promise.resolve(database.query("SELECT COUNT(materialID) AS 'num' FROM materials")).then(function(value) {
        database.query("INSERT INTO materials (materialID, materialName, materialType, supplierID, unitOfMeasure) VALUES ?", [[[(value[0].num + 1), materialName,materialType, supplierID, unit]]])
      
    })
}

exports.getAll = function() {
    return database.query("SELECT * FROM materials left join material_types ON materials.materialType = material_types.mtID");
}

exports.findItem = function(itemID){
    return database.query("SELECT * FROM materials WHERE materials.materialID =?",[itemID])
}

exports.edit = function(materialID, materialName, materialType, supplierID) {
    database.query("UPDATE materials SET materialName = ? , materialType = ?, supplierID = ? WHERE materialID = ?", [materialName, materialType, supplierID, materialID]);
 }
 
exports.getAllWithSupplier = function(){
    return database.query("SELECT * FROM materials NATURAL JOIN suppliers LEFT JOIN material_types ON materials.materialType = material_types.mtID")
}

exports.getSupplier = function(materialID){
    return database.query("SELECT supplierID FROM materials WHERE materialID = ?",[materialID])
}
