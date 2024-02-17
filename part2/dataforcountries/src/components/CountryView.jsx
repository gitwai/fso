import CountryWeather from './CountryWeather'

const CountryView = ({ country }) => {
    const [ lat, lng ] = country.latlng
    return (
        <>
        <h3>{ country.name.common }</h3>
        <div>capital { country.capital }</div>
        <div>area { country.area }</div>
        <h4>languages</h4>
        <ul>
        { Object.values(country.languages).map((language , key) =>
            <li key={key}>{language}</li> )}
        </ul>
        <img src={country.flags.png} />
        <h2>Weather in {country.capital}</h2>
        <CountryWeather lat={lat} lng={lng} />
        </>
    )
}

export default CountryView
