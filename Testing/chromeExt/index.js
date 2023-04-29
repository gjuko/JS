let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");

inputEl.addEventListener("keydown", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault(); // prevent the form from submitting
        myLeads.push(inputEl.value);
        inputEl.value = "";
        renderLeads();
    }
});

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value);
    inputEl.value = "";
    renderLeads();
});

function renderLeads() {
    let listItems = "";
    for (let i = 0; i < myLeads.length; i++) {
        // Wrap the checkbox in a <div> element with class="lead-item"
        listItems += "<div class='lead-item'><input type='checkbox'>" + "<a href='" + myLeads[i] + "' target='_blank'>" + myLeads[i] + "</a></div>";
    }
    ulEl.innerHTML = listItems;  
}
