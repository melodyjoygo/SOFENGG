const Database = require("./database");
var database = new Database();

exports.create = function(materialID,  quantity, dateModified,unitPrice) {
    Promise.resolve(database.query("SELECT COUNT(inventoryID) AS 'count' FROM inventory")).then(function(value) {
        database.query("INSERT INTO inventory (inventoryID, materialID, quantity, dateModified,unitPrice) VALUES ?", [[[(value[0].count + 1), materialID,quantity, dateModified,unitPrice]]])
    })
}

exports.getAll = function() {
    return database.query("SELECT * FROM inventory");
}

exports.getAllTableView = function() {
    return database.query("SELECT *,SUM(quantity) AS 'totalQty',AVG(unitPrice) AS 'averageUnitCost',(SUM(quantity) * AVG(unitPrice)) AS 'totalCost' FROM softengdb.inventory LEFT JOIN materials ON inventory.materialID = materials.materialID LEFT JOIN material_types ON materials.materialType = material_types.mtID LEFT JOIN suppliers ON suppliers.supplierID = materials.supplierID GROUP BY inventory.materialID");
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

exports.getTotalQty = function(materialID){
    return database.query("SELECT *,SUM(quantity) AS 'totalQty',AVG(unitPrice) AS 'averageUnitCost',(SUM(quantity) * AVG(unitPrice)) AS 'totalCost' FROM softengdb.inventory LEFT JOIN materials ON inventory.materialID = materials.materialID LEFT JOIN material_types ON materials.materialType = material_types.mtID LEFT JOIN suppliers ON suppliers.supplierID = materials.supplierID WHERE inventory.materialID = 1 GROUP BY inventory.materialID ",[materialID])
}

exports.getItemForRelease = function(materialID){
    return database.query("SELECT * FROM softengdb.inventory WHERE materialID = ? ORDER BY unitPrice",[materialID])
}

exports.setQuantity = function(quantity,inventoryID){
    database.query("UPDATE inventory SET quantity = ? WHERE inventoryID = ?",[quantity,inventoryID])
}