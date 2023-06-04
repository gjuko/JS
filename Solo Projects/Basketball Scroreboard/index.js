
let homScore = document.getElementById("home-score");
let guestScore = document.getElementById("guest-score");
let timerDisplay = document.getElementById("timer");

let homeCount = 0;
let guestCount = 0;


function increaseHomeScoreOne () {
    homeCount += 1
    homScore.textContent = homeCount
}

function increaseHomeScoreTwo () {
    homeCount += 2
    homScore.textContent = homeCount
}

function increaseHomeScoreThree () {
    homeCount += 3
    homScore.textContent = homeCount
}

function increaseGuestScoreOne () {
    guestCount += 1
    guestScore.textContent = guestCount
}

function increaseGuestScoreTwo () {
    guestCount += 2
    guestScore.textContent = guestCount
}

function increaseGuestScoreThree () {
    guestCount += 3
    guestScore.textContent = guestCount
}

function clearScores() {
    homeCount = 0;
    guestCount = 0;
    homScore.textContent = homeCount;
    guestScore.textContent = guestCount;
}

let clearButton = document.getElementById("clear-button");
clearButton.addEventListener("click", clearScores);

let countDownMinutes = 15; // Set the countdown duration in minutes
let countDownTime = countDownMinutes * 60 * 1000; // Convert minutes to milliseconds

// Set the date we're counting down to by adding the countdown time to the current time
let countDownDate = new Date().getTime() + countDownTime;

// Update the count down every 1 second
let x = setInterval(function() {
  // Get today's date and time
  let now = new Date().getTime();
    
  // Find the distance between now and the count down date
  let distance = countDownDate - now;
    
  // Time calculations for minutes and seconds
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
  // Output the result in an element with id="demo"
  document.getElementById("demo").innerHTML = minutes + "m " + seconds + "s";
    
  // If the count down is over, write some text 
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "EXPIRED";
  }
}, 1000);
