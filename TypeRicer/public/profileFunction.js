function change(num) {
    index = num;
    changeData();
    if(num == 0) {
        $("#easy").css("color","#4CAF50");
        $("#easy").css("border-color","#4CAF50");
        $("#medium").css("color","#FFFFFF");
        $("#medium").css("border-color","#FFFFFF");
        $("#hard").css("color","#FFFFFF");
        $("#hard").css("border-color","#FFFFFF");
        $("#statsBox").css("visibility","visible");
    } else if(num == 1) {
        $("#easy").css("color","#FFFFFF");
        $("#easy").css("border-color","#FFFFFF");
        $("#medium").css("color","#FFEB3B");
        $("#medium").css("border-color","#FFEB3B");
        $("#hard").css("color","#FFFFFF");
        $("#hard").css("border-color","#FFFFFF");
        $("#statsBox").css("visibility","visible");
    } else if(num == 2) {
        $("#easy").css("color","#FFFFFF");
        $("#easy").css("border-color","#FFFFFF");
        $("#medium").css("color","#FFFFFF");
        $("#medium").css("border-color","#FFFFFF");
        $("#hard").css("color","#F44336");
        $("#hard").css("border-color","#F44336");
        $("#statsBox").css("visibility","visible");
    }
    $("#statsWPM").text(wpm);
    $("#statsTime").text(time);
    $("#statsAcc").text(acc);
    $("#statsInfo").text(game);
}

var index;
var wpm, time, acc, game;
var list = [], games = [];

function changeData() {
    if(list[index + 1][0].wpm == null) {
        wpm = (0).toFixed(2);
        time = "00:00";
        acc = (0).toFixed(2) + "%";        
        game = 0;
    } else {
        wpm = parseFloat(list[index + 1][0].wpm).toFixed(2);
        time = digits(Math.trunc(parseInt(list[index + 1][0].time)/60)) + ":" + digits(parseInt(list[index + 1][0].time) % 60);
        acc = parseFloat(list[index + 1][0].accuracy).toFixed(2) + "%";
        game = games[index][0].count;
    }
}

function setData(data, game) {
    index = 0;
    var temporary = data.replace(/&#39;/g, "'");
    temporary = temporary.replace(/&#34;/g, "\"");
    list = JSON.parse(temporary);
    var temp = game.replace(/&#39;/g, "'");
    temp = temp.replace(/&#34;/g, "\"");
    games = JSON.parse(temp);
    changeData();
    change(0);
}

function digits(num) {
    return num > 9 ? "" + num: "0" + num;
}