import axios from 'axios'

// const url = 'https://covid19.mathdro.id/api'
const url = 'https://corona-api.com/'

export const fetchData = async (country) => {
    let changeableUrl = url

    if(country){
        changeableUrl = `${url}/countries/${country}`
        try{
            const { data: { data: { updated_at, latest_data: { confirmed, recovered, deaths } } } } = await axios.get(changeableUrl)
            console.log(confirmed, recovered, deaths, updated_at)
            return { confirmed, recovered, deaths, updated_at }
        } catch(error) {
            console.log(error)
        }

    } else {
        changeableUrl = `${url}/timeline`
        try{
            const { data: { data } } = await axios.get(changeableUrl)
            const { confirmed, recovered, deaths, date } = data[0]
    
            return { confirmed, recovered, deaths, date }
        } catch(error) {
            console.log(error)
        }
    }

}

export const fetchDailyData = async() => {
    try{
        const { data: { data } } = await axios.get(`${url}/timeline`)

        const modifiedData = data.reverse().map((dailyData) => ({
            confirmed: dailyData.confirmed,
            deaths: dailyData.deaths,
            date: dailyData.date
        }))

        return modifiedData

    } catch (error){
        console.log(error)
    }
}

export const fetchCountries = async() => {
    try {
        const {data : { data: countries }} = await axios.get(`${url}/countries`)
        return countries.map((country) => ({
            name: country.name,
            code: country.code
        }))
    } catch (error) {
        console.log(error)
    }
}