const Database = require("./database");
var database = new Database();

exports.create = function(projectID, materialID, quantity, price) {
    Promise.resolve(database.query("SELECT COUNT(pmID) AS 'count' FROM project_materials")).then(function(value) {
        database.query("INSERT INTO project_materials (pmID,projectID, materialID, quantity, price ) VALUES ?", [[[(value[0].count + 1),projectID, materialID, quantity, price]]])
    })
}

exports.getAll = function() {
    return database.query("SELECT * FROM project_materials");
}

exports.getAllProjectMaterials = function(projID){
    return database.query("SELECT * FROM softengdb.project_materials LEFT JOIN materials ON project_materials.materialID = materials.materialID LEFT JOIN material_types ON materials.materialType = material_types.mtID LEFT JOIN suppliers ON materials.supplierID = suppliers.supplierID WHERE projectID = ?",[projID])
}

exports.edit = function(projectMaterialID,qty,itemID){
   database.query("UPDATE project_materials SET quantity = ?, materialID = ? WHERE pmID = ?",[qty,itemID,projectMaterialID])
}