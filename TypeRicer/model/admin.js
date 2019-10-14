const Database = require("../model/database");
var database = new Database();

exports.getData = function() {
    return database.query("SELECT * FROM texts");
}

exports.addText = function(title, text) {
    Promise.resolve(database.query("SELECT COUNT(idtexts) AS 'count' FROM texts")).then(function(value) {
        database.query("INSERT INTO texts (idtexts, title, texts) VALUES ?", [[[(value[0].count + 1), title, text]]]);
    })
}

exports.updateText = function(index, title, text) {
    database.query("UPDATE texts SET title = ?, texts = ? WHERE idtexts = ?", [title, text, index]);
}

exports.deleteText = function(index) {
    database.query("DELETE FROM texts WHERE idtexts = ?", [index]);
    database.query("ALTER TABLE texts DROP idtexts");
    database.query("ALTER TABLE texts AUTO_INCREMENT = 1");
    database.query("ALTER TABLE texts ADD idtexts int UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY FIRST");
}