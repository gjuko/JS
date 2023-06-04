const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
const symbols = ["~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?","/"];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

function generateRandomCharacter(includeSymbols = true, includeNumbers = true) {
  let allCharacters = characters;
  if (includeSymbols) {
    allCharacters = allCharacters.concat(symbols); // Combine characters and symbols
  }
  if (includeNumbers) {
    allCharacters = allCharacters.concat(numbers); // Combine characters, symbols, and numbers
  }

  const randomIndex = Math.floor(Math.random() * allCharacters.length);
  return allCharacters[randomIndex];
}

function genPassword() {
  const includeSymbols = document.getElementById("includeSymbols").checked;
  const includeNumbers = document.getElementById("includeNumbers").checked;
  const passwordLength = document.getElementById("passwordLength").value;

  let password1 = '';
  let password2 = '';

  for (let i = 0; i < passwordLength; i++) {
    password1 += generateRandomCharacter(includeSymbols, includeNumbers);
    password2 += generateRandomCharacter(includeSymbols, includeNumbers);
  }

  document.getElementById("password1").value = password1;
  document.getElementById("password2").value = password2;
}

function copyPassword() {
    var passwordField = document.getElementById("password1");
    passwordField.select();
    passwordField.setSelectionRange(0, 99999);
    document.execCommand("copy");
    showCopyMessage("Password 1");
  }
  
  function copyPassword1() {
    var passwordField = document.getElementById("password2");
    passwordField.select();
    passwordField.setSelectionRange(0, 99999);
    document.execCommand("copy");
  
    var copyMessage = document.getElementById("copyMessage");
    copyMessage.style.display = "block";
    copyMessage.textContent = "Copied to Clipboard";
  
    setTimeout(function() {
      copyMessage.style.display = "none";
    }, 1000);
  }
  
  function copyPassword() {
    var passwordField = document.getElementById("password1");
    passwordField.select();
    passwordField.setSelectionRange(0, 99999);
    document.execCommand("copy");
  
    var copyMessage = document.getElementById("copyMessage");
    copyMessage.style.display = "block";
    copyMessage.textContent = "Copied to Clipboard";
  
    setTimeout(function() {
      copyMessage.style.display = "none";
    }, 1000);
  }
  

function updatePasswordLength() {
  const passwordLength = document.getElementById("passwordLength").value;
  document.getElementById("passwordLengthValue").textContent = passwordLength;
}
