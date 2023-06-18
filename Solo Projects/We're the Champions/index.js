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

let tempFromValue = ""
let tempToValue = ""


publishBtn.addEventListener("click", function() {

    let fromValue = fromFieldBtn.value;
    let toValue = toFieldBtn.value;

    tempFromValue = fromValue;
    tempToValue = toValue;
    
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

    


    // Update "To" and "From" values in the labels
    let Endorsement1FromField = document.querySelector('.endorsementTo1').innerHTML = "To: " + toValue;
    let Endorsement1ToField = document.querySelector('.endorsementFrom1').innerHTML = "From: " + fromValue;

    let Endorsement2FromField = document.querySelector('.endorsementTo2').innerHTML = "To: " + Endorsement1FromField;
    let Endorsement2ToField = document.querySelector('.endorsementFrom2').innerHTML = "From: " + Endorsement1ToField;

    let Endorsement3FromField = document.querySelector('.endorsementTo3').innerHTML = "To: " + Endorsement2ToField;
    let Endorsement3ToField = document.querySelector('.endorsementFrom3').innerHTML = "From: " + Endorsement2FromField;

    document.querySelector('.endorsementTo3').innerHTML = "To: " + tempToValue;
    document.querySelector('.endorsementFrom3').innerHTML = "From: " + tempFromValue;


    clearInputFieldEl()
})

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function endrsmntOne() {
    endrsmntOneValue.value = ""
}

onValue(endorsementsInDB, function (snapshot) {
    endorsementBoxes.innerHTML = "";
  
    if (snapshot.exists()) {
      const allEndorsement = Object.entries(snapshot.val());
      allEndorsement.forEach((el) => {
        renderText(el);
      });
    }
});

