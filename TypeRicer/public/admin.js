var data = [];
var curObj;

$(document).on('click', '#textButton', function(e){
    setData(e.target.textContent);
});

function createTable(obj) {
    var temporary = obj.replace(/&#39;/g, "'");
    temporary = temporary.replace(/&#34;/g, "\"");
    data = JSON.parse(temporary);

    var table = document.createElement("table");
    table.id = "textTable";
    var tr = table.insertRow(-1); // TABLE ROW.

    for (var x = 0; x < data.length; x++) {
        tr = table.insertRow(-1);
        var td = document.createElement("td");
        var button = document.createElement("button");
        button.id = "textButton";
        button.innerText = data[x].title;
        button.dataset.toggle = "modal";
        button.dataset.target = "#textInfo";
        td.appendChild(button);
        tr.appendChild(td);
    }

    var divContainer = document.getElementById("showData");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
}

function getObject(name) {
    return data.find(el => el.title == name);
}

function setData(title) {
    curObj = getObject(title);
    $("#textTitle").val(curObj.title);
    $("#textContent").val(curObj.texts);
}

function add() {
    $("#newTitle").val($("#addTitle").val());
    $("#newText").val($("#addText").val());
    $("#addData").click();
}

function remove() {
    $("#textID").val(curObj.idtexts);
    $("#deleteData").click();
}

function update() {
    $("#updateID").val(curObj.idtexts);
    $("#updateTitle").val($("#textTitle").val());
    $("#updateText").val($("#textContent").val());
    $("#updateData").click();
}

function confirm() {
    $("#deleteConfirm")
}