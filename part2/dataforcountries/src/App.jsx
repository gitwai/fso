import { useState, useEffect} from 'react'
import CountryList from './components/CountryList'
import CountryView from './components/CountryView'
import CountriesService from './services/countries'


const App = () => {
    const [countries, setCountries] = useState([])
    const [filter, setFilter] = useState('')
    const [view, setView] = useState([])

    useEffect( () => {
        CountriesService
            .getAll()
            .then( allCountries => setCountries( allCountries ))
            .catch(err => console.log(err))
    }, [])

    const updateFilter = (event) => {
        setFilter(event.target.value)
        setView([])
    }

    const onShow = (country) => {
        setView([country])
    }

    const filteredCountries = view.length === 1 
        ? view
        : !filter
            ? []
            : countries.filter(country => country.name.common.match(new RegExp(filter, "i")))

    return (
        <>
        find countries<input value={filter} onChange={updateFilter} />
        <CountryList matches={filteredCountries} onClick={onShow}/>
        { filteredCountries.length === 1  && (<CountryView country={filteredCountries[0]} />)}
        </>
    )
}

export default App
