import React, { useState, useEffect } from 'react'
import { NativeSelect, FormControl } from '@material-ui/core'

import styles from './CountryPicker.module.css'

import { fetchCountries } from '../../api'

const CountryPicker = ({ handleCountryChange }) => {
    const [fetchedCountries, setFetchedCountries] = useState([])

    useEffect(() => {
        const fetchAPI = async() => {
            setFetchedCountries(await fetchCountries())
        }
        fetchAPI()
    }, [setFetchedCountries])

    return (
        <div>
            <FormControl className={styles.formControl}>
                <NativeSelect defaultValue="" onChange={(e) => handleCountryChange(e.target.value, e.target.selectedOptions[0].innerText)}>
                    <option value="">Global</option>
                    {fetchedCountries.map((country, i) => (
                        <option key={i} value={country.code} name={country.name}>{country.name}</option>
                    ))}
                </NativeSelect>
            </FormControl>
        </div>
    )
}

export default CountryPicker
