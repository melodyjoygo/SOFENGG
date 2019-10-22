const Database = require("./database");
var database = new Database();

exports.create = function(projectName, clientID) {
    Promise.resolve(database.query("SELECT COUNT(projectID) AS 'count' FROM projects")).then(function(value) {
        database.query("INSERT INTO projects (projectID, projectName, clientID) VALUES ?", [[[(value[0].count + 1), projectName, clientID]]])
    })
}

exports.getAll = function() {
    return database.query("SELECT * FROM projects");
}
