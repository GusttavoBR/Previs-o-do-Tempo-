// Get Weather Conditions
/*  API da254ee7611d9a8c1d9bdaaa8510ee02 
 https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={da254ee7611d9a8c1d9bdaaa8510ee02} */

// Get Lat and Lon
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={da254ee7611d9a8c1d9bdaaa8510ee02}



// Variables

let btn = document.querySelector('button')
let cityCoordinates = []






// Functions
btn.addEventListener('click', async (e) => {
    e.preventDefault()
    let searchInput = document.querySelector('#searchInput')
    cityName = searchInput.value
    console.log(`Cidade dentro do botao: ${cityName}`)

    await getLat_lon()
    await getWeather()
    
})

const getLat_lon = async (lat, lon) => {
    try {
        let response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=da254ee7611d9a8c1d9bdaaa8510ee02`)
        let cityResponse = await response.json()
        let lat = cityResponse[0].lat
        let lon = cityResponse[0].lon
        console.log(`Lat e Lon: ${lat}, ${lon}`)
        cityCoordinates = [lat, lon]
        console.log(cityCoordinates)
        return cityCoordinates
    }
    catch (error) {
        console.log(error)
    }
}


const getWeather = async () => {
    try {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${cityCoordinates[0]}&lon=${cityCoordinates[1]}&units=metric&lang=pt&appid=da254ee7611d9a8c1d9bdaaa8510ee02
`)
        let weatherNow = await response.json()
        console.log(weatherNow)
        return weatherNow

    }
    catch (error) {
        console.log(error)
    }
}

// Script
