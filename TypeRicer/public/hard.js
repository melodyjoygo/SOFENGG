var text, timer, time;
var size, counter, error, count, index;
var list = [];

document.addEventListener('keydown', function(e) { 
    if(e.keyCode == 8) {
        if(counter != 0 && $("#inputText").val() != '') {
            counter--;
        } 
    }
})

document.addEventListener('keypress', function(e) {
    $("#inputText").css({'color':'rgb(255, 110, 236)'});
    if(e.keyCode == 13) {
        e.preventDefault();
    }
    if(e.keyCode == text.charCodeAt(counter)) {
        counter++;
        init();
        if(e.keyCode == 32) {
            e.preventDefault();
            $("#inputText").val('');
            count++;
            marking();
        }
    } else {
        if(counter < size) {
            e.preventDefault();
            error++;
            $("#inputText").css({'color':'#F44336'});
        } 
    }
    if(counter == size) {
        $('input[type="text"]').prop("disabled", true);
        e.preventDefault();
        $("#inputText").val('');
        $("#mainText").text(words.join(" "));
        finish();
    }
})

function setData(data) {
    var temporary = data.replace(/&#39;/g, "'");
    temporary = temporary.replace(/&#34;/g, "\"");
    list = JSON.parse(temporary);
    start();
}


function start() {
    $('input[type="text"]').prop("disabled", true);
    countdown();
    init();
}

function countdown() {
    var ctr = 5;
    var down = setInterval(function() {
        if(ctr > 0) {
            $("#countDown").css({'visibility':'visible'});
            $("#count").text(ctr);
            ctr--;
        } else {
            randomize(1);
            $("#count").text("GO!");
            clearInterval(down);
            $("#count").text("");
            $("#countDown").css({'visibility':'hidden'});
            $("#inputText").focus();
        }
    }, 1000);
}

function startGame() {
    timer = setInterval(function() {
        setInterval(convertTime(), 1000);
    }, 1000);
}

function convertTime() {
    var newTime;
    if(time < 60) {
        newTime = "00:" + digits(time);
    } else {
        newTime = digits(Math.trunc(time/60)) + ":" + digits(time % 60);
    }
    $("#time").text(newTime);
    time++;
}

function digits(num) {
    return num > 9 ? "" + num: "0" + num;
}

function init() {
    $("#showStats").css("visibility","hidden");
}

function marking() {
    var mark = document.getElementById("mainText");
    mark.innerHTML = words.join(" ");
    var innerHTML = mark.innerHTML;
    if(count == 0) {
        innerHTML = "<span class='highlight'>" + innerHTML.substring(0, getIndex() + words[count].length - 1) + "</span> " + innerHTML.substring(getIndex() + words[count].length);
    } else {
        innerHTML = "<span class='done'>" + innerHTML.substring(0, getIndex()) + "</span><span class='highlight'>" + innerHTML.substring(getIndex(), getIndex() + words[count].length) + "</span>" + innerHTML.substring(getIndex() + words[count].length);
    }
    mark.innerHTML = innerHTML;
}

function getIndex() {
    return words.slice(0, count).join(" ").length + 1;
}

function finish() {
    clearInterval(timer);
    timer = null;
    $("#wpmStat").text(getTime(words.length));
    $("#accuracyStat").text(getAccuracy() + "%");
    $("#timeStat").text(digits(Math.trunc(time/60)) + ":" + digits(time % 60));
    $("#showStats").css("visibility","visible");
    $.ajax({
        url: "/game/endGame",
        method: "post",
        data: {
            wpm: getTime(words.length),
            acc: getAccuracy(),
            time: time,
            diff: 2
        },
        success: function(response) {
            console.log(response);
        }
    })
}

function getTime(num) {
    return ((num/time)*60).toFixed(2);
}

function getAccuracy() {
    return ((size-error)*100/size).toFixed(2);
}

function randomize(num) {
    if(num != 1) {
        num = 0;
    }
    counter = 0;
    count = 0;
    error = 0;
    time = num;
    index = Math.floor(Math.random() * list.length);
    var str = list[index].texts.split(" ");
    text = '';
    for(var i = 0; i < str.length; i++) {
        text += (shuffle(str[i].split('')).join(''));
        if(i < str.length - 1) { 
            text += " ";
        }
    }
    $("#mainText").text(text);
    $("#textTitle").text(list[index].title);
    size = text.length;
    words = $.trim($("#mainText").text()).split(" ");
    marking();
    $('input[type="text"]').prop("disabled", false);
    $("#time").text("00:00");
    $("#time").css({'visibility':'visible'});
    startGame();
    init();
}

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}