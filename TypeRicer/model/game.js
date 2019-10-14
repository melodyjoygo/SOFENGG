const Database = require("../model/database");
var database = new Database();

exports.generate = function() {
    return database.query("SELECT * FROM texts");
}

exports.submitData = function(idusers, wpm, time, acc, diff) {
    if(diff == 0) {
        Promise.resolve(database.query("SELECT COUNT(ideasy) AS 'count' FROM easy")).then(function(easy) {
            database.query("INSERT INTO easy (ideasy, idusers, wpm, time, accuracy) VALUES ?", [[[(easy[0].count + 1), idusers, wpm, time, acc]]]);
        })
    } else if(diff == 1) {
        Promise.resolve(database.query("SELECT COUNT(idmedium) AS 'count' FROM medium")).then(function(medium) {
            database.query("INSERT INTO medium (idmedium, idusers, wpm, time, accuracy) VALUES ?", [[[(medium[0].count + 1), idusers, wpm, time, acc]]]);
        })
    } else if(diff == 2){
        Promise.resolve(database.query("SELECT COUNT(idhard) AS 'count' FROM hard")).then(function(hard) {
            database.query("INSERT INTO hard (idhard, idusers, wpm, time, accuracy) VALUES ?", [[[(hard[0].count + 1), idusers, wpm, time, acc]]]);
        })
    }     
}

exports.getEasy = function() {
    return database.query("SELECT username, wpm, time, accuracy FROM easy INNER JOIN users ON easy.idusers = users.idusers WHERE username != 'guest'");
}

exports.getMedium = function() {    
    return database.query("SELECT username, wpm, time, accuracy FROM medium INNER JOIN users ON medium.idusers = users.idusers WHERE username != 'guest'");
}

exports.getHard = function() {  
    return database.query("SELECT username, wpm, time, accuracy FROM hard INNER JOIN users ON hard.idusers = users.idusers WHERE username != 'guest'");
}
