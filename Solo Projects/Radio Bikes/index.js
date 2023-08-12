import { bikesData } from './data.js'

const bikeRadios = document.getElementById("bike-radios")
const showImageBtn = document.getElementById("Show-Image-btn")

function getTypesArray(bikes){
    const bikesArray = []
    for (let bike of bikes){
        for (let type of bike.type){
            bikesArray.push(type)
        }
    }
    return bikesArray
}


function renderTypesRadios(bikes){
    let radioItems = ''
    const types = getTypesArray(bikes)
    for (let type of types) {
        radioItems += `<p>${type}</p>`
    }
    bikeRadios.innerHTML = radioItems
}

renderTypesRadios(bikesData)