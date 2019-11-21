const Database = require("./database");
var database = new Database();

exports.getClerkAddRequests = function(){
    return database.query("SELECT * FROM clerk_add_request LEFT JOIN users ON clerk_add_request.userID = users.userID LEFT JOIN user_Types on users.userType = user_Types.utID")
}

exports.getStockmanEditRequests = function(){
    return database.query("SELECT * FROM stockman_edit_requests LEFT JOIN users ON stockman_edit_requests.userID = users.userID LEFT JOIN user_Types on users.userType = user_Types.utID")
}

exports.getStockmanReleaseRequests = function(){
    return database.query("SELECT * FROM stockman_release_requests LEFT JOIN users ON stockman_release_requests.userID = users.userID LEFT JOIN user_Types on users.userType = user_Types.utID")
}