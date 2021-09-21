import axios from 'axios'

// const url = 'https://covid19.mathdro.id/api'
const url = 'https://corona-api.com/'

export const fetchData = async (country) => {
    let changeableUrl = url

    if(country){
        changeableUrl = `${url}/countries/${country}`
        try{
            const { data } = await axios.get(changeableUrl)
            const {confirmed, recovered, deaths} = data.data.latest_data
            const date = data.data.updated_at

            return { confirmed, recovered, deaths, date }
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
        })).sort((a, b) => a.name > b.name && 1 || -1)
    } catch (error) {
        console.log(error)
    }
}