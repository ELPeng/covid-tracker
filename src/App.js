import React, { Component } from 'react'

import { Cards, Chart, CountryPicker } from './components'
import styles from './App.module.css'
import { fetchData } from './api'

import covidImg from './images/covid.png'

class App extends Component{
    state = {
        data: {},
        country: '',
    }

    async componentDidMount(){
        const fetchedData = await fetchData()
        this.setState({ data: fetchedData })
    }

    handleCountryChange = async(code, name) => {
        // console.log(code, name)
        const fetchedData = await fetchData(code)

        this.setState({data: fetchedData, country: name})
    }

    render(){
        const { data, country } = this.state
        return (
            <div className={styles.container}>
                <img className={styles.image} src={covidImg} alt="COVID-19" />
                <Cards data={data} />
                {console.log(data)}
                <CountryPicker handleCountryChange={this.handleCountryChange} />
                <Chart data={data} country={country}/>
            </div>
        )
    }
}

export default App
