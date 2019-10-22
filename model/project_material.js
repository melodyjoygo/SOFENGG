const Database = require("./database");
var database = new Database();

exports.create = function(projectID, materialID, quantity, price) {
    Promise.resolve(database.query("SELECT COUNT(pmID) AS 'count' FROM project_materials")).then(function(value) {
        database.query("INSERT INTO project_materials (pmID,projectID, materialID, quantity, price ) VALUES ?", [[[[(value[0].count + 1),projectID, materialID, quantity, price]]]])
    })
}

exports.getAll = function() {
    return database.query("SELECT * FROM project_materials");
}
