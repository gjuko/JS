import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, update } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

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

const likeButtons = document.querySelectorAll(".like-button");
likeButtons.forEach(button => {
  button.addEventListener("click", function() {
    let likeCountEl = this.parentNode.querySelector(".likeCount");
    let currentLikes = parseInt(likeCountEl.textContent);
    let isLiked = this.dataset.liked === "true";

    if (isLiked) {
      currentLikes--;
      this.dataset.liked = "false";
      this.textContent = "♡";
    } else {
      currentLikes++;
      this.dataset.liked = "true";
      this.textContent = "❤️";
    }

    likeCountEl.textContent = currentLikes;

    // Update the like count in the database
    let endorsementKey = this.parentNode.parentNode.id;
    let endorsementRef = ref(database, `Endorsements/${endorsementKey}`);
    update(endorsementRef, { likeCountEl: currentLikes });
  });
});

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

  const endorsementObj = {
    content: inputValue,
    from: fromValue,
    to: toValue,
    likeCountEl: 0
  };

  const newEndorsementRef = push(endorsementsInDB);
  const newEndorsementKey = newEndorsementRef.key;

  const updates = {};
  updates[newEndorsementKey] = endorsementObj;

  update(endorsementsInDB, updates)
    .then(() => {
      clearInputFieldEl();
    })
    .catch((error) => {
      console.error("Error pushing data to Firebase:", error);
    });

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

  const likeCountEl1 = document.getElementById("likeCount1");
  const likeCountEl2 = document.getElementById("likeCount2");
  const likeButton1 = document.getElementById("likeButton1");
  const likeButton2 = document.getElementById("likeButton2");

  likeCountEl2.textContent = likeCountEl1.textContent;
  likeButton2.dataset.liked = likeButton1.dataset.liked;
  likeButton2.textContent = likeButton1.textContent;

  clearInputFieldEl();
});

function clearInputFieldEl() {
  inputFieldEl.value = "";
  fromFieldEl.value = "";
  toFieldEl.value = "";
}

function fetchExistingValues() {
  onValue(endorsementsInDB, function (snapshot) {
    if (snapshot.exists()) {
      const endorsements = snapshot.val();
      endorsementsFieldOne.innerHTML = "";
      endorsementsFieldTwo.innerHTML = "";
      endorsementsFieldThree.innerHTML = "";
      endorsFrom1.innerHTML = "";
      endorsFrom2.innerHTML = "";
      endorsFrom3.innerHTML = "";
      endorsTo1.innerHTML = "";
      endorsTo2.innerHTML = "";
      endorsTo3.innerHTML = "";

      Object.entries(endorsements).forEach(([key, value]) => {
        addNewElement(value);

        endorsementsFieldThree.innerHTML = endorsementsFieldTwo.innerHTML;
        endorsementsFieldTwo.innerHTML = endorsementsFieldOne.innerHTML;
        endorsementsFieldOne.innerHTML = value.content;

        endorsFrom3.innerHTML = endorsFrom2.innerHTML;
        endorsFrom2.innerHTML = endorsFrom1.innerHTML;
        endorsFrom1.innerHTML = value.from;

        endorsTo3.innerHTML = endorsTo2.innerHTML;
        endorsTo2.innerHTML = endorsTo1.innerHTML;
        endorsTo1.innerHTML = value.to;
      });
    }
  });
}

window.addEventListener('load', function () {
  fetchExistingValues();
});

database.ref('.info/connected').on('value', function (snapshot) {
  if (snapshot.val() === true) {
    fetchExistingValues();
  }
});

function addNewElement(value) {
}
