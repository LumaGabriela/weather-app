const weatherInfo = (location, temperature, thermalSensation, weatherInfo, temperatureRange, windInfo, wIcon) => {
    const city = document.querySelector(`#${location}`)
    const temp = document.querySelector(`#${temperature}`)
    const sensation = document.querySelector(`#${thermalSensation}`) 
    const weather = document.querySelector(`#${weatherInfo}`)
    const minMax = document.querySelector(`#${temperatureRange}`)
    const wind = document.querySelector(`#${windInfo}`)
    const icon = document.querySelector(`#${wIcon}`)
    return {city, temp, sensation, weather, minMax, wind, icon}
}
const far = {
    name: 'imperial',
    icon: '°F',
    speed: 'mph'
}
const celsius = {
    name: 'metric',
    icon: '°C',
    speed: 'm/s'
}
const units = [celsius, far]

const searchCity = document.querySelector('#search-input')
const searchBtn = document.querySelector('#search-btn')
const toggleUnit = document.querySelector('#weather-unit')
const currentWeather = weatherInfo('weather-location' ,'weather-temperature', 'weather-sensation', 'general-weather-info', 'min-max-temperatures', 'weather-wind', 'weather-icon')

const getWeatherInfo = async (location, unit) => {
    try{
        const response = await fetch(
            `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unit.name}&appid=24f21e4535689e7b9e7b04d96ed3c4f4`, {mode: 'cors'})
        const info = await response.json()
        const coord = {
            lat: info.coord.lat,
            lon: info.coord.lon
        }
        console.log(info)
        displayWeather(info, unit)
        getWeatherForecast(coord.lat, coord.lon)
    } catch(err){
        alert('Please type a valid city name')
    }
}
// Get forecast for the week
const getWeatherForecast = async (lat, lon) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=24f21e4535689e7b9e7b04d96ed3c4f4`, {mode: 'cors'})
    const info = await response.json()
    console.log(info)
}

const displayWeather = (weather, unit) => {
    currentWeather.city.innerHTML = `${weather.name}, ${weather.sys.country}<br>${weather.weather[0].description} `
    currentWeather.icon.src = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
    currentWeather.minMax.innerHTML = `min: ${weather.main.temp_min}${unit.icon} <br> max: ${weather.main.temp_max}${unit.icon}`
    currentWeather.temp.innerText = `${weather.main.temp} ${unit.icon}`
    currentWeather.wind.innerText = `Wind speed: ${weather.wind.speed} ${unit.speed}`
    currentWeather.weather.innerHTML = `Feels like: ${weather.main.feels_like}${unit.icon}`
}


searchCity.addEventListener('keyup', (e) => {
    if(e.key === 'Enter'){
        getWeatherInfo(searchCity.value, units[0])
        searchCity.value = ''
    }
})
searchBtn.addEventListener('click', () => {
    getWeatherInfo(searchCity.value, units[0])
    searchCity.value = ''
})
toggleUnit.addEventListener('click', () => {
    console.log(toggleUnit.checked)
})
getWeatherInfo('London', units[0])

// main:
// feels_like: 34.61
// grnd_level: 1005
// humidity: 55
// pressure: 1007
// sea_level: 1007
// temp: 31.49
// temp_max: 31.49
// temp_min: 31.49