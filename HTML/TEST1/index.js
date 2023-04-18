let num1 = 8
let num2 = 2
let num3 = 5

document.getElementById("num1-el").textContent = num1
document.getElementById("num2-el").textContent = num2
document.getElementById("num3-el").textContent = num3

let sumEl = document.getElementById("sum-el")

function add() {
    let result = num1 + num2 - num3
    sumEl.textContent = "Sum: " + result
}

function subtract() {
    let result = num1 - num2 + num3
    sumEl.textContent = "Sum: " + result
}

function divide() {
    let result = num1 / num2 * num3
    sumEl.textContent = "Sum: " + result
}

function multiply() {
    let result = num1 * num2 / num3
    sumEl.textContent = "Sum: " + result
}