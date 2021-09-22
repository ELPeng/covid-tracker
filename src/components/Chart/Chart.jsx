import React, { useState, useEffect } from 'react'
import { fetchDailyData } from '../../api'
import { Line, Bar } from 'react-chartjs-2'

import styles from './Chart.module.css'

const Chart = ({ data: { confirmed, deaths, recovered, infectedDataFor3Months }, country }) => {
    const [dailyData, setDailyData] = useState([])
        useEffect(() => {
            const fetchAPI = async() => {
                setDailyData(await fetchDailyData())
            }

            fetchAPI()
        }, [])
        
        const lineChart = (
            dailyData.length
                ? (
                <Line 
                    data={{
                        labels: dailyData.map(({ date }) => date),
                        datasets: [{
                            data: dailyData.map(({ confirmed }) => confirmed),
                            label: 'Infected',
                            borderColor: '#3333ff',
                            fill: true,
                        },
                        {
                            data: dailyData.map(({ deaths }) => deaths),
                            label: 'Deaths',
                            borderColor: 'red',
                            backgroundColor: 'rgba(255, 0, 0, 0.5)',
                            fill: true,
                        },],
                    }}
                />) : null
        )
        
        const barChart = (
            confirmed
                ? (
                    <Bar 
                        data={{
                            labels: ['Infected', 'Recovered', 'Deaths'],
                            datasets: [{
                                label: 'People',
                                backgroundColor: [
                                    'rgba(0, 0, 255, 0.5)',
                                    'rgba(0, 255, 0, 0.5)',
                                    'rgba(255, 0, 0, 0.5)',
                                ],
                                 data: [confirmed, recovered, deaths]
                            }]
                        }}
                        options={{
                            legend: { display: false },
                            plugins:{
                                title: { 
                                    display: true, 
                                    text: `Current state in ${country}`,
                                    font:{
                                        size: 18
                                    }
                                }
                            }
                        }}
                    />
                ) : null
        )

        const countryLineChart = (
            infectedDataFor3Months
                ? (
                <Line 
                    data={{
                        labels: infectedDataFor3Months.map(({ date }) => date),
                        datasets: [{
                            data: infectedDataFor3Months.map(({ infected }) => infected),
                            label: 'Total Infected',
                            borderColor: '#3333ff',
                            fill: true,
                        },],
                    }}
                    options= {{
                        plugins: {
                            title: {
                                display: true,
                                text: `Infected population in ${country} over last 90 days`,
                                font:{
                                    size: 18
                                },
                                padding: {
                                    top: 30,
                                    bottom: 15
                                }
                            }
                    }}}
                />) : null
        )
        

    return (
        <div className={styles.container}>
            {country !== 'Global' ? barChart : lineChart}
            {country ? countryLineChart : null}
        </div>
    )
}

export default Chart
