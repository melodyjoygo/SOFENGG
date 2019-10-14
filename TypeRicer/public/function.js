let statsHidden = true;

$(document).ready(function(){                
    $("#showStats").css("visibility","hidden")
    statsHidden = true
});

function hideStats(){
    if(statsHidden){        
        $("#showStats").css("visibility","hidden")
        statsHidden=false
    }else if(!statsHidden){
        $("#showStats").css("visibility","visible")
        statsHidden=true
    }

}

