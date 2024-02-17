import axios from 'axios'

const getAll = () => {
    const request = axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
    return request.then( res => res.data)
}

const getWeather = (lat, lon) => {
    const key = import.meta.env.VITE_API_KEY
    const request = axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${key}`)
    return request.then( res => res.data)
}

export default {
    getAll,
    getWeather,
}
