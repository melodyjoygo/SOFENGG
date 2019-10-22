const Database = require("./database");
var database = new Database();

exports.getType = function(mtID){
    return database.query("SELECT * FROM material_types WHERE material_types.mtID = ?",[mtID]);
}

exports.getAll = function() {
    return database.query("SELECT * FROM material_types");
}