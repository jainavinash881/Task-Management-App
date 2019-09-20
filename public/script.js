
async function tasks() {
    const posts = fetch('http://localhost:3000/tasks/tasks');
    const data = await posts;
    const article = await data.json();
    let result = article.results;

    let dynamic = '<ul class="list-items ui-sortable connectedSortable" id="sortable1">';
    for (var i = 0; i < result.length; i++) {
        dynamic += `<li id="editableLi" draggable="true" ondragend="dragEnd()" ondragover="dragOver(event)" ondragstart="dragStart(event)">${article.results[i].card_name}</li>`;
    }

    dynamic += '</ul>';
    document.getElementById('card-data').innerHTML = dynamic;
}

tasks();

async function tasks_completed() {
    const posts = fetch('http://localhost:3000/completed/completed');
    const data = await posts;
    const article = await data.json();
    let result = article.results;

    let dynamic = '<ul class="list-items ui-sortable connectedSortable" id="sortable1">';
    for (var i = 0; i < result.length; i++) {
        dynamic += `<li id="editableLi" draggable="true" ondragend="dragEnd()" ondragover="dragOver(event)" ondragstart="dragStart(event)">${article.results[i].card_name}</li>`;
    }

    dynamic += '</ul>';
    document.getElementById('card-data2').innerHTML = dynamic;
}
tasks_completed();

async function tasks_pending() {
    const posts = fetch('http://localhost:3000/pending_tasks/pending_tasks');
    const data = await posts;
    const article = await data.json();
    let result = article.results;

    let dynamic = '<ul class="list-items ui-sortable connectedSortable" id="sortable1">';
    for (var i = 0; i < result.length; i++) {
        dynamic += `<li id="editableLi" draggable="true" ondragend="dragEnd()" ondragover="dragOver(event)" ondragstart="dragStart(event)">${article.results[i].card_name}</li>`;
    }

    dynamic += '</ul>';
    document.getElementById('card-data1').innerHTML = dynamic;
}
tasks_pending();
//display username on home screen
// let name = Cookies.get('UName');
// let dis = name.split('@');
// let dispname = dis[0];
// document.getElementById('Uname').innerHTML = dispname;



//This is function to the dynamically created element would work
function createEditableLi(ulId) {
    const ul = document.getElementById(ulId);
    const newLi = document.createElement("li");
    const newinput = document.createElement("input");
    newinput.setAttribute("class", "input_style");
    newinput.setAttribute("id", "textboxId");
    newinput.setAttribute("type", "text");
    newinput.setAttribute("name", "card_name");
    newLi.setAttribute("id", "editableLi");
    ul.appendChild(newLi);
    newLi.appendChild(newinput);
}

//card dragable
$(function () {
    $("#parent_1, #parent_2,#parent_3").sortable({
        connectWith: ".list-items"
    }).disableSelection();
});

$(function () {
    $("#parent01, #parent02,#parent03").sortable({
        connectWith: ".sortable"
    }).disableSelection();
});



$(".input_style").attr("autocomplete", "off");


var selected;
function dragStart(e) {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", null);
    selected = e.target;
}

function dragOver(e) {
    if (isBefore(selected, e.target)) e.target.parentNode.insertBefore(selected, e.target);
    else e.target.parentNode.insertBefore(selected, e.target.nextSibling);
}

function dragEnd() {
    selected = null;
}

function isBefore(el1, el2) {
    var cur;
    if (el2.parentNode === el1.parentNode) {
        for (cur = el1.previousSibling; cur; cur = cur.previousSibling) {
            if (cur === el2) return true;
        }
    } else return false;
}