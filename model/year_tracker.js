const Database = require("./database");
var database = new Database();

exports.create = function(currYear) {
    Promise.resolve(database.query("SELECT COUNT(yearID) AS 'count' FROM year_tracker")).then(function(value) {
        database.query("INSERT INTO year_tracker (yearID, currYear) VALUES ?", [[[(value[0].count + 1), currYear]]])
    })
}

exports.getAll = function() {
    return database.query("SELECT * FROM year_tracker")
}

exports.check = function() {
    return database.query("SELECT * FROM year_tracker WHERE year_tracker.yearID = 1")
}

exports.update = function(year){
    database.query("UPDATE year_tracker SET year_tracker.currYear = ? WHERE year_tracker.yearID = 1",[[[year]]])
}