import { useState , useEffect } from 'react'
import CountriesService from '../services/countries'

const CountryWeather = ({lat , lng}) => {
    const [data, setData ] = useState(null)
    const [isError, setIsError] = useState(false)
    useEffect( () => {
        CountriesService
            .getWeather(lat, lng)
            .then(data => {
                const dataObject = { 
                    temp: data.current.temp,
                    logo: data.current.weather[0],
                    windSpeed: data.current.wind_speed,
                }
                setData(dataObject)
                setIsError(false)
            })
            .catch(err => setIsError(true))
    },[lat, lng])

    if (isError) return <div>weather info. service is not available</div>
    
    return data &&
        (
            <>
            <div>temperature {data.temp} Celcius</div>
            <img src={(`https://openweathermap.org/img/wn/${data.logo.icon}@2x.png`)}
                alt={data.logo.description} />
            <div>wind {data.windSpeed} m/s</div>
            </>
        )
}

export default CountryWeather
