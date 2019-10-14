var list = [];

$(document).on('keydown', function() {
    $("#errorText").css({'visibility':'hidden'});
})

$(document).ready(function() {
    $("#formCenter").submit(function(e) {
        var name = $("#username").val();
        var pass = $("#password").val();
        if(name != "admin" && pass != "admin") {
            if(list.find(el => el.username == name && el.password == pass) == undefined) {
                e.preventDefault();
                $("#errorText").css({'visibility':'visible'});
                $("#password").val("");
            }
        }
    })
})

function loadUsers(data) {
    var temporary = data.replace(/&#34;/g, "\"");
    list = JSON.parse(temporary);
}

function validateUser() {
    var name = $("#username").val();
    var pass = $("#password").val();
    if(name != "admin" && pass != "admin") {
        var temp = list.find(el => el.username == name && el.password == pass);
        if(temp == undefined) {
            $("#errorText").css({'visibility':'visible'});
        } else {
            $("#submit").click();
        }
    } else {
        $("#submit").click();
    }
}