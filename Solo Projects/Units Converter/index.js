let inputEl = document.getElementById("input-el")
let lengthEl = document.getElementById("length-el")
let volumeEl = document.getElementById("volume-el")
let massEl = document.getElementById("mass-el")
let convertBtn = document.getElementById("convert-btn")


let meterToFeet =  3.281
const feetToMeters =  0.305
const literToGallon =  0.264
const gallonToLiters =  3.785
const kiloToPound =  2.204
const poundToKilo =  0.454

convertBtn.addEventListener("click", function() {
    let baseValue = inputEl.value
    const conversionToFeet = baseValue * meterToFeet
    const conversionToMeters = baseValue * feetToMeters
    const conversionToGallons = baseValue * literToGallon
    const conversionToLiters = baseValue * gallonToLiters
    const conversionToPound = baseValue * kiloToPound
    const conversionToKilo = baseValue * poundToKilo
    lengthEl.textContent = `${baseValue} meters = ${conversionToFeet.toFixed(3)} feet | ${baseValue} feet = ${conversionToMeters.toFixed(3)} meters` 
    volumeEl.textContent = `${baseValue} liters = ${conversionToGallons.toFixed(3)} gallons | ${baseValue} gallons = ${conversionToLiters.toFixed(3)} liters` 
    massEl.textContent = `${baseValue} kilos = ${conversionToPound.toFixed(3)} pounds | ${baseValue} pounds = ${conversionToKilo.toFixed(3)} kilos` 
})

