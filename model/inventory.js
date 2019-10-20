const Database = require("./database");
var database = new Database();

exports.create = function(materialID,  quantity, dateModified) {
    Promise.resolve(database.query("SELECT COUNT(inventoryID) AS 'count' FROM inventory")).then(function(value) {
        database.query("INSERT INTO inventory (inventoryID, materialID, quantity, dateMOdified) VALUES ?", [[[[(value[0].count + 1), materialID,quantity, dateModified]]]])
    })
}

exports.getAll = function() {
    return database.query("SELECT * FROM inventory");
}
