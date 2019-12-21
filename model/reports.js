const Database = require("./database");
var database = new Database();

exports.generateAllInventory = function(){
    return database.query("SELECT inventoryID AS 'Item ID', materialName AS 'Item',type AS 'Material',supplierName AS 'Supplier',SUM(quantity) AS 'Quantity',cast(AVG(unitPrice) as decimal(10,2)) AS 'Average Unit Cost',cast((SUM(quantity) * AVG(unitPrice)) as decimal(10,2)) AS 'Total Cost' FROM softengdb.inventory LEFT JOIN materials ON inventory.materialID = materials.materialID LEFT JOIN material_types ON materials.materialType = material_types.mtID LEFT JOIN suppliers ON suppliers.supplierID = materials.supplierID GROUP BY inventory.materialID")
}

exports.generateSpecificInventory = function(itemID){
    return database.query("SELECT inventoryID as 'Item ID',materialName as 'Item Name', material_types.type as'Material', supplierName as'Supplier',quantity as 'Quantity',unitPrice as 'Unit Price',(unitPrice * quantity) as 'Total Cost'  FROM softengdb.inventory LEFT JOIN materials ON inventory.materialID = materials.materialID LEFT JOIN material_types ON materials.materialType = material_types.mtID LEFT JOIN suppliers ON suppliers.supplierID = materials.supplierID LEFT JOIN unit_of_measures ON materials.unitOfMeasure = unit_of_measures.uomID WHERE inventory.materialID = ?",[itemID])
}

exports.generateAllTransaction = function(){
    return database.query("SELECT transactionID AS 'Transaction ID',materialName as 'Item',type as 'Material',supplierName as 'Supplier' ,quantity AS 'Quantity',price as 'Unit Price' ,date_format(date,'%Y-%m-%d') as 'Date Ordered' FROM transactions NATURAL JOIN suppliers NATURAL JOIN materials LEFT JOIN material_types ON materials.materialType = material_types.mtID")
}

exports.generateAllTransactionWithDate = function(date1,date2){
    return database.query("SELECT transactionID AS 'Transaction ID',materialName as 'Item',type as 'Material',supplierName as 'Supplier' ,quantity AS 'Quantity',price as 'Unit Price' ,date_format(date,'%Y-%m-%d') as 'Date Ordered' FROM transactions NATURAL JOIN suppliers NATURAL JOIN materials LEFT JOIN material_types ON materials.materialType = material_types.mtID where date between ? and ?",[date1,date2])
}

exports.generateSpecificTransacion = function(itemID){
    return database.query("SELECT transactionID AS 'Transaction ID',materialName as 'Item',type as 'Material',supplierName as 'Supplier' ,quantity AS 'Quantity',price as 'Unit Price' ,date_format(date,'%Y-%m-%d') as 'Date Ordered' FROM transactions NATURAL JOIN suppliers NATURAL JOIN materials LEFT JOIN material_types ON materials.materialType = material_types.mtID where materialID = ?",[itemID])
}

exports.generateSpecificTransactionWithDate = function(itemID,date1,date2){
    return database.query("SELECT transactionID AS 'Transaction ID',materialName as 'Item',type as 'Material',supplierName as 'Supplier' ,quantity AS 'Quantity',price as 'Unit Price' ,date_format(date,'%Y-%m-%d') as 'Date Ordered' FROM transactions NATURAL JOIN suppliers NATURAL JOIN materials LEFT JOIN material_types ON materials.materialType = material_types.mtID where materialID = ? AND date between ? and ?",[itemID,date1,date2])
}

exports.generateProjectWithDate = function(date1,date2,choiceID){
    return database.query("SELECT materialName as 'Item', type as 'Material',supplierName as 'Supplier', qty as 'Quantity', projectNumber as 'Project', date_format(dateReleased, '%Y-%m-%d') AS 'Date Released' FROM softengdb.stockman_release_requests LEFT JOIN materials ON materials.materialID = stockman_release_requests.itemID LEFT JOIN material_types ON materials.materialType = material_types.mtID LEFT JOIN projects ON projects.projectID = stockman_release_requests.projectID LEFT JOIN suppliers ON materials.supplierID = suppliers.supplierID where released = '1' AND projects.projectID = ? AND dateReleased between ? AND ?",[choiceID,date1,date2])
}

exports.generateProjectWithoutDate = function(choiceID){
    return database.query("SELECT materialName as 'Item', type as 'Material',supplierName as 'Supplier', qty as 'Quantity', projectNumber as 'Project', date_format(dateReleased, '%Y-%m-%d') AS 'Date Released' FROM softengdb.stockman_release_requests LEFT JOIN materials ON materials.materialID = stockman_release_requests.itemID LEFT JOIN material_types ON materials.materialType = material_types.mtID LEFT JOIN projects ON projects.projectID = stockman_release_requests.projectID LEFT JOIN suppliers ON materials.supplierID = suppliers.supplierID where released = '1' AND projects.projectID = ?",[choiceID])
}

exports.generateSupplierWithDate = function(date1,date2,choiceID){
    return database.query("SELECT materialName as 'Item', type as 'Material',supplierName as 'Supplier', qty as 'Quantity', projectNumber as 'Project', date_format(dateReleased, '%Y-%m-%d') AS 'Date Released' FROM softengdb.stockman_release_requests LEFT JOIN materials ON materials.materialID = stockman_release_requests.itemID LEFT JOIN material_types ON materials.materialType = material_types.mtID LEFT JOIN projects ON projects.projectID = stockman_release_requests.projectID LEFT JOIN suppliers ON materials.supplierID = suppliers.supplierID where released = '1' AND suppliers.supplierID = ? AND dateReleased between ? AND ?",[choiceID,date1,date2])
}

exports.generateSupplierWithoutDate = function(choiceID){
    return database.query("SELECT materialName as 'Item', type as 'Material',supplierName as 'Supplier', qty as 'Quantity', projectNumber as 'Project', date_format(dateReleased, '%Y-%m-%d') AS 'Date Released' FROM softengdb.stockman_release_requests LEFT JOIN materials ON materials.materialID = stockman_release_requests.itemID LEFT JOIN material_types ON materials.materialType = material_types.mtID LEFT JOIN projects ON projects.projectID = stockman_release_requests.projectID LEFT JOIN suppliers ON materials.supplierID = suppliers.supplierID where released = '1' AND materials.supplierID = ?",[choiceID])
}

exports.generateAllItemWithDate = function(date1,date2){
    return database.query("SELECT materialName as 'Item', type as 'Material',supplierName as 'Supplier', qty as 'Quantity', projectNumber as 'Project', date_format(dateReleased, '%Y-%m-%d') AS 'Date Released' FROM softengdb.stockman_release_requests LEFT JOIN materials ON materials.materialID = stockman_release_requests.itemID LEFT JOIN material_types ON materials.materialType = material_types.mtID LEFT JOIN projects ON projects.projectID = stockman_release_requests.projectID LEFT JOIN suppliers ON materials.supplierID = suppliers.supplierID where released = '1' AND dateReleased between ? AND ?",[date1,date2])
}

exports.generateSpecificItemWithoutDate = function(choiceID){
    return database.query("SELECT materialName as 'Item', type as 'Material',supplierName as 'Supplier', qty as 'Quantity', projectNumber as 'Project', date_format(dateReleased, '%Y-%m-%d') AS 'Date Released' FROM softengdb.stockman_release_requests LEFT JOIN materials ON materials.materialID = stockman_release_requests.itemID LEFT JOIN material_types ON materials.materialType = material_types.mtID LEFT JOIN projects ON projects.projectID = stockman_release_requests.projectID LEFT JOIN suppliers ON materials.supplierID = suppliers.supplierID where released = '1' AND stockman_release_requests.itemID = ?",[choiceID])
}

exports.generateSpecificItemWithDate = function(date1,date2,choiceID){
    return database.query("SELECT materialName as 'Item', type as 'Material',supplierName as 'Supplier', qty as 'Quantity', projectNumber as 'Project', date_format(dateReleased, '%Y-%m-%d') AS 'Date Released' FROM softengdb.stockman_release_requests LEFT JOIN materials ON materials.materialID = stockman_release_requests.itemID LEFT JOIN material_types ON materials.materialType = material_types.mtID LEFT JOIN projects ON projects.projectID = stockman_release_requests.projectID LEFT JOIN suppliers ON materials.supplierID = suppliers.supplierID where released = '1' AND stockman_release_requests.itemID = ? AND dateReleased between ? AND ?",[choiceID,date1,date2])
}

exports.generateAllItemWithoutDate = function(){
    return database.query("SELECT materialName as 'Item', type as 'Material',supplierName as 'Supplier', qty as 'Quantity', projectNumber as 'Project', date_format(dateReleased, '%Y-%m-%d') AS 'Date Released' FROM softengdb.stockman_release_requests LEFT JOIN materials ON materials.materialID = stockman_release_requests.itemID LEFT JOIN material_types ON materials.materialType = material_types.mtID LEFT JOIN projects ON projects.projectID = stockman_release_requests.projectID LEFT JOIN suppliers ON materials.supplierID = suppliers.supplierID where released = '1'")
}