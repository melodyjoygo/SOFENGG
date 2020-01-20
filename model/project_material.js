const Database = require("./database");
var database = new Database();

exports.create = function(projectID, materialID, quantity) {
    Promise.resolve(database.query("SELECT COUNT(pmID) AS 'count' FROM project_materials")).then(function(value) {
        database.query("INSERT INTO project_materials (pmID,projectID, materialID, quantity) VALUES ?", [[[(value[0].count + 1),projectID, materialID, quantity]]])
    })
}

exports.getAll = function() {
    return database.query("SELECT * FROM project_materials");
}

exports.getAllProjectMaterials = function(projID){
    return database.query("SELECT * , (quantity * A.unitCost)'price' FROM softengdb.project_materials LEFT JOIN materials ON project_materials.materialID = materials.materialID LEFT JOIN material_types ON materials.materialType = material_types.mtID LEFT JOIN suppliers ON materials.supplierID = suppliers.supplierID LEFT JOIN (SELECT materialID, SUM(quantity) AS 'totalQty', MAX(unitPrice) AS 'unitCost' from softengdb.inventory group by materialID)A on A.materialID = project_materials.materialID WHERE projectID = ?",[projID])
}

exports.edit = function(projectMaterialID,qty,itemID){
   database.query("UPDATE project_materials SET quantity = ?, materialID = ? WHERE pmID = ?",[qty,itemID,projectMaterialID])
}