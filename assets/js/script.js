// Get Weather Conditions
/*  API da254ee7611d9a8c1d9bdaaa8510ee02 
 https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={da254ee7611d9a8c1d9bdaaa8510ee02} */

// Get Lat and Lon
// https://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={da254ee7611d9a8c1d9bdaaa8510ee02}



// Variables

let btn = document.querySelector('button')
let cityCoordinates = []
let titulo = document.querySelector('.titulo')
let resultado = document.querySelector('.resultado')
let tempInfo = document.querySelector('.tempInfo')
let ventoInfo = document.querySelector('.ventoInfo')
let ventoPonto = document.querySelector('.ventoPonto')
let imgElement = document.querySelector('.temp img')

// Functions
btn.addEventListener('click', async (e) => {
    e.preventDefault()
    let searchInput = document.querySelector('#searchInput')
    let cityName = searchInput.value
    console.log(`Cidade dentro do botao: ${cityName}`)
    let cityData = await getLat_lon(cityName)
    let lat = cityData.lat
    let lon = cityData.lon
    let name = cityData.name

    let weatherConditions = await getWeather(lat, lon)
    let temp = weatherConditions.temp
    let wind = weatherConditions.wind
    let windDeg = weatherConditions.windDeg
    let icon = weatherConditions.icon


    resultado.style.display = 'block'
    titulo.textContent = name
    tempInfo.textContent = temp
    ventoInfo.textContent = wind
    ventoPonto.style.transform = `rotate(${windDeg}deg)`
    imgElement.src = `https://openweathermap.org/img/wn/${icon}@2x.png`

})

const getLat_lon = async (cityName) => {
    try {
        let response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=da254ee7611d9a8c1d9bdaaa8510ee02`)
        let cityResponse = await response.json()
        let lat = cityResponse[0].lat
        let lon = cityResponse[0].lon
        let name = cityResponse[0].name

        return {
            lat: lat,
            lon: lon,
            name: name
        }
    }
    catch (error) {
        console.log(error)
    }
}


const getWeather = async (lat, lon) => {
    try {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=pt&appid=da254ee7611d9a8c1d9bdaaa8510ee02
`)
        let weatherNow = await response.json()
        console.log(weatherNow)
        let temp = weatherNow.main.temp
        let wind = weatherNow.wind.speed
        let windDeg = weatherNow.wind.deg
        let icon = weatherNow.weather[0].icon

        return {
            temp: temp,
            wind: wind,
            windDeg: windDeg,
            icon: icon
        }

    }
    catch (error) {
        console.log(error)
    }
}

// Script
