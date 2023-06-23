import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL: "https://playground-7c965-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const endorsementsInDB = ref(database, "Endorsements");

const publishBtn = document.getElementById("publish-btn");
const inputFieldEl = document.getElementById("main-input");
const endorsementsFieldOne = document.getElementById("endfield1");
const endorsementsFieldTwo = document.getElementById("endfield2");
const endorsementsFieldThree = document.getElementById("endfield3");
const fromFieldEl = document.getElementById("From-field");
const toFieldEl = document.getElementById("To-field");
const endorsFrom1 = document.getElementById("endorsementFrom1");
const endorsFrom2 = document.getElementById("endorsementFrom2");
const endorsFrom3 = document.getElementById("endorsementFrom3");
const endorsTo1 = document.getElementById("endorsementTo1");
const endorsTo2 = document.getElementById("endorsementTo2");
const endorsTo3 = document.getElementById("endorsementTo3");

let previousValue = "";
let tempValue = "";
let previousfromValue = "";
let tempfromValue = "";
let previousToValue = "";
let tempToValue = "";


publishBtn.addEventListener("click", function() {
    let fromValue = fromFieldEl.value;
    let inputValue = inputFieldEl.value;
    let toValue = toFieldEl.value;
    // push(endorsementsInDB, inputValue)
    endorsementsFieldThree.innerHTML = endorsementsFieldTwo.innerHTML;
    endorsementsFieldTwo.innerHTML = endorsementsFieldOne.innerHTML;
    endorsementsFieldOne.innerHTML = inputValue;
    tempValue = endorsementsFieldTwo.innerHTML;
    previousValue = inputValue;

    endorsFrom3.innerHTML = endorsFrom2.innerHTML;
    endorsFrom2.innerHTML = endorsFrom1.innerHTML;
    endorsFrom1.innerHTML = fromValue;
    tempfromValue = endorsFrom2.innerHTML;
    previousfromValue = fromValue;

    endorsTo3.innerHTML = endorsTo2.innerHTML;
    endorsTo2.innerHTML = endorsTo1.innerHTML;
    endorsTo1.innerHTML = toValue;
    tempToValue = endorsTo2.innerHTML;
    previousToValue = toValue;

  clearInputFieldEl();
});

function clearInputFieldEl() {
  inputFieldEl.value = "";
  fromFieldEl.value = "";
  toFieldEl.value = "";
}


onValue(endorsementsInDB, function (snapshot) {
    if (snapshot.exists()) {
      const allEndorsement = Object.entries(snapshot.val());
      allEndorsement.forEach((el) => {
        renderText(el);
      });
    }
});





    // Variables

const likeBtn = document.querySelector('.heart-icon');
const numberOfLikesElement = document.querySelector('.number-of-likes');

let numberOfLikes = Number.parseInt(numberOfLikesElement.textContent, 10);
let isLiked = false;

// Functions

const likeClick = () => {
  if (!isLiked) {
    likeBtn.classList.add('isLiked');
    numberOfLikes++;
    numberOfLikesElement.textContent = numberOfLikes;
    isLiked = !isLiked;
  } else {
    likeBtn.classList.remove('isLiked');
    numberOfLikes--;
    numberOfLikesElement.textContent = numberOfLikes;
    isLiked = !isLiked;
  }
};

// Event Listeners

likeBtn.addEventListener('click', likeClick);