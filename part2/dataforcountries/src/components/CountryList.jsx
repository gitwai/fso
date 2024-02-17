
const CountryList = ({ matches , onClick }) => {
    if (matches.length === 1 || matches.length === 0) {
        return false
    } else if (matches.length > 10) {
        return <div>Too many matches, specify another filter</div>
    } else {
        return matches.map((country, index)=> (
                <div key={index}>
                    {country.name.common} 
                    <button onClick={() => onClick(country)}>show</button>
                </div>
            ))
    }
}

export default CountryList
