const Database = require("./database");
var database = new Database();

exports.create = function(clientID,projectNumber,dateAdded) {
    Promise.resolve(database.query("SELECT COUNT(projectID) AS 'count' FROM projects")).then(function(value) {
        database.query("INSERT INTO projects (projectID, clientID,projectNumber,dateAdded,status) VALUES ?", [[[(value[0].count + 1), clientID,projectNumber,dateAdded,'Pending']]])
    })
}

exports.getAll = function() {
    return database.query("SELECT * FROM projects LEFT JOIN clients ON projects.clientID = clients.clientID");
}

exports.getLatest = function(){
    return database.query("SELECT * FROM projects ORDER BY projects.projectNumber DESC LIMIT 1")
}

exports.getAllTableView = function() {
    return database.query("SELECT clients.clientName, projects.projectNumber, projects.dateAdded, projects.status FROM softengdb.clients INNER JOIN softengdb.projects ON clients.clientID = projects.clientID;");
}

exports.editProjectDetails = function(projectID,clientID,status){
    database.query("UPDATE projects SET clientID = ?, status = ? WHERE projectID = ?",[clientID,status,projectID])
}

 