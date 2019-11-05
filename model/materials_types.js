const Database = require("./database");
var database = new Database();

exports.create = function(materialType) {
    Promise.resolve(database.query("SELECT COUNT(mtID) AS 'count' FROM material_types")).then(function(value) {
        database.query("INSERT INTO material_types (mtID, type) VALUES ?", [[[(value[0].count + 1), materialType]]])
      
    })
}

exports.getType = function(mtID){
    return database.query("SELECT * FROM material_types WHERE material_types.mtID = ?",[mtID]);
}

exports.getAll = function() {
    return database.query("SELECT * FROM material_types");
}

exports.edit = function(mtID, type) {
    database.query("UPDATE material_types SET type = ? WHERE mtID = ?", [type, mtID]);
 }
 