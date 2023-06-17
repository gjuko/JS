import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-7c965-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementsInDB = ref(database, "Endorsements")

const publishBtn = document.getElementById("publish-btn")
const inputFieldEl = document.getElementById("main-input")
const endorsementsFieldOne = document.getElementById("endfield1")
const endorsementsFieldTwo = document.getElementById("endfield2")
const endorsementsFieldThree = document.getElementById("endfield3")
const fromFieldBtn = document.getElementById("From-field")
const toFieldBtn = document.getElementById("To-field")







let previousValue = ""
let tempValue = ""

publishBtn.addEventListener("click", function() {

    let ToValue = toFieldBtn.value
    toFieldBtn.innerHTML = ToValue;


    let inputValue = inputFieldEl.value
    // push(endorsementsInDB, inputValue)
    
    if (previousValue !== "") {
        endorsementsFieldOne.innerHTML = previousValue;
    }
    
    if (tempValue !== "") {
        endorsementsFieldThree.innerHTML = tempValue;
    }
    
    endorsementsFieldTwo.innerHTML = endorsementsFieldOne.innerHTML;
    endorsementsFieldOne.innerHTML = inputValue;
    tempValue = endorsementsFieldTwo.innerHTML;
    previousValue = inputValue;

    clearInputFieldEl()
})

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function endrsmntOne() {
    endrsmntOneValue.value = ""
}
