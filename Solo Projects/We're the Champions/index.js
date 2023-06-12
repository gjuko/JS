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

publishBtn.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    push(endorsementsInDB, inputValue)
    endorsementsFieldOne.innerHTML = inputValue
})