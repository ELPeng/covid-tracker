import React, { useState, useEffect } from 'react'
import { fetchDailyData } from '../../api'
import { Line, Bar } from 'react-chartjs-2'

import styles from './Chart.module.css'

const Chart = ({ data: { confirmed, deaths, recovered, infectedDataFor3Months }, country }) => {
    const isGlobal = country && country !== 'Global'
    const [width, setWidth] = useState(window.innerWidth)
    const [dailyData, setDailyData] = useState([])
    
    function handleWindowSizeChange(){
        setWidth(window.innerWidth)
    }
    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange)
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange)
        }
    }, [])

    useEffect(() => {
        const fetchAPI = async() => {
            setDailyData(await fetchDailyData())
        }

        fetchAPI()
    }, [])

    let isMobile = width <= 768   
        
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
                    options={{
                        elements:{
                            point:{
                                pointRadius: 0
                            }
                        },
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
                            plugins:{
                                legend: { display: false },
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
            infectedDataFor3Months && infectedDataFor3Months.length
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
                    options={{
                        scales:{
                            xAxis:{
                                display: !isMobile
                            }
                        },
                        plugins: {
                            title: {
                                display: true,
                                text: `Infected population in ${country} over last 90 days`,
                                font:{
                                    size: 16
                                },
                                padding: {
                                    top: 30,
                                    bottom: 15
                                },
                            },
                            legend: { display: false },
                        }
                    }}
                />) : <div className={styles.error}>
                        <p>Unable to populate data from last 3 months.</p>
                        <p>Please select another country</p>
                    </div>
        )
        

    return (
        <div className={styles.container}>
            {isGlobal ? barChart : lineChart}
            {isGlobal ? countryLineChart : null}
        </div>
    )
}

export default Chart
