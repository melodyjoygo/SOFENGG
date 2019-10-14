var level = 0;

function change(num) {
    level = num;
    if(num == 0) {
        $("#desc").text("Displays a short paragraph and checks per word.");
        $("#desc").css("color","#4CAF50");
        $("#easyLevel #button").css("color","#4CAF50");
        $("#easyLevel").css("border-color","#4CAF50");
        $("#medLevel #button").css("color","#FFFFFF");
        $("#medLevel").css("border-color","#FFFFFF");
        $("#hardLevel #button").css("color","#FFFFFF");
        $("#hardLevel").css("border-color","#FFFFFF");
        $("#startBox").css("visibility","visible");
    } else if(num == 1) {
        $("#desc").text("Displays a short paragraph and checks per character.");
        $("#desc").css("color","#FFEB3B");
        $("#easyLevel #button").css("color","#FFFFFF");
        $("#easyLevel").css("border-color","#FFFFFF");
        $("#medLevel #button").css("color","#FFEB3B");
        $("#medLevel").css("border-color","#FFEB3B");
        $("#hardLevel #button").css("color","#FFFFFF");
        $("#hardLevel").css("border-color","#FFFFFF");
        $("#startBox").css("visibility","visible");

    } else if(num == 2) {
        $("#desc").text("Displays a short paragraph, the letters of each word are jumbled, and checks per character.");
        $("#desc").css("color","#F44336");
        $("#easyLevel #button").css("color","#FFFFFF");
        $("#easyLevel").css("border-color","#FFFFFF");
        $("#medLevel #button").css("color","#FFFFFF");
        $("#medLevel").css("border-color","#FFFFFF");
        $("#hardLevel #button").css("color","#F44336");
        $("#hardLevel").css("border-color","#F44336");
        $("#startBox").css("visibility","visible");
    }
}

function startGame() {
    if(level == 0) {
        document.getElementById("startBox").href="/game/easy";
    } else if(level == 1) {
        document.getElementById("startBox").href="/game/medium";
    } else if(level == 2) {
        document.getElementById("startBox").href="/game/hard";
    }
    return true;
}