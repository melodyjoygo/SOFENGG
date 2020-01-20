const Database = require("./database");
var database = new Database();

exports.create = function(clientID,projectNumber,dateAdded) {
    Promise.resolve(database.query("SELECT COUNT(projectID) AS 'count' FROM projects")).then(function(value) {
        database.query("INSERT INTO projects (projectID, clientID,projectNumber,dateAdded,status) VALUES ?", [[[(value[0].count + 1), clientID,projectNumber,dateAdded,'Pending']]])
    })
}

exports.getAll = function() {
    return database.query("SELECT * ,sum(price) as 'totalCost',date_format(dateAdded,'%Y-%m-%d') as 'date' FROM projects LEFT JOIN clients ON projects.clientID = clients.clientID LEFT JOIN(SELECT project_materials.projectID as 'pID', (quantity * A.unitCost)'price' FROM softengdb.project_materials LEFT JOIN materials ON project_materials.materialID = materials.materialID LEFT JOIN material_types ON materials.materialType = material_types.mtID LEFT JOIN suppliers ON materials.supplierID = suppliers.supplierID LEFT JOIN (SELECT materialID, SUM(quantity) AS 'totalQty', MAX(unitPrice) AS 'unitCost' from softengdb.inventory group by materialID)A on A.materialID = project_materials.materialID )A on A.pID = projects.projectID group by projects.projectID");
}

exports.getLatest = function(){
    return database.query("SELECT * FROM projects ORDER BY projects.projectNumber DESC LIMIT 1")
}

exports.getAllTableView = function() {
    return database.query("SELECT clients.clientName, projects.projectNumber, DATE_FORMAT(projects.dateAdded,'%Y-%m-%d') AS 'date', projects.status FROM softengdb.clients INNER JOIN softengdb.projects ON clients.clientID = projects.clientID;");
}

exports.editProjectDetails = function(projectID,clientID,status){
    database.query("UPDATE projects SET clientID = ?, status = ? WHERE projectID = ?",[clientID,status,projectID])
}

exports.getProjectCount = function(month){
    return database.query("SELECT month(dateAdded) as month, COUNT(month(dateAdded)) as count FROM softengdb.projects GROUP BY month(dateAdded) ORDER BY month(dateAdded);")
}

 