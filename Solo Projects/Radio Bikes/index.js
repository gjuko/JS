import { bikesData } from './data.js'

// const bikeRadios = document.getElementById("Bike-radios")
// const showImageBtn = document.getElementById("Show-Image-btn")

function getTypesArray(bikes){
    const bikesArray = []
    for (let bike of bikes){
        for (let type of bike.type){
            bikesArray.push(type)
        }
    }
    return bikesArray
}


console.log(getTypesArray(bikesData))

function renderTypesRadios(bikes){
    const types = getTypesArray(bikes)


    console.log(types)



}

renderTypesRadios(bikesData)