const Database = require("./database");
var database = new Database();

exports.create = function(materialID,  quantity, dateModified) {
    Promise.resolve(database.query("SELECT COUNT(inventoryID) AS 'count' FROM inventory")).then(function(value) {
        database.query("INSERT INTO inventory (inventoryID, materialID, quantity, dateModified) VALUES ?", [[[(value[0].count + 1), materialID,quantity, dateModified]]])
    })
}

exports.getAll = function() {
    return database.query("SELECT * FROM inventory");
}

exports.getAllTableView = function() {
    return database.query("SELECT inventory.materialID,inventory.inventoryID, material_types.type, materials.materialName,  unit_of_measures.unitOfMeasure, suppliers.supplierName, inventory.quantity FROM softengdb.inventory INNER JOIN softengdb.materials INNER JOIN softengdb.unit_of_measures INNER JOIN softengdb.suppliers INNER JOIN softengdb.material_types ON inventory.materialID = materials.materialID AND materials.materialType = material_types.mtID AND materials.supplierID = suppliers.supplierID AND unit_of_measures.uomID = materials.unitOfMeasure");
}

exports.restock = function(invID,qty){
    database.query("UPDATE inventory SET quantity = quantity + ?  WHERE inventoryID = ?",[qty,invID])
}

exports.updateDate = function(invID,date){
    database.query("UPDATE inventory SET dateModified = ?  WHERE inventoryID = ?",[date,invID])
}

exports.updateUnitPrice = function(invID,unitPrice){
    database.query("UPDATE inventory SET unitPrice = ?  WHERE inventoryID = ?",[unitPrice,invID])
}

exports.getAllMeasurements = function(){
    return database.query("SELECT * FROM unit_of_measures");
}