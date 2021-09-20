import React from 'react'
import { Card, CardContent, Typography, Grid } from '@material-ui/core'
import CountUp from 'react-countup'

import styles from './Cards.module.css'

const Cards = ({ data: { confirmed, recovered, deaths, lastUpdate } }) => {
    const cardInfo = [
        {
            title: 'Infected',
            style: `${styles.card} ${styles.infected}`,
            endVal: confirmed.value,
            description: 'Number of active cases of COVID-19'
        },
        {
            title: 'Recovered',
            style: `${styles.card} ${styles.recovered}`,
            endVal: recovered.value,
            description: 'Number of recoveries from COVID-19'
        },
        {
            title: 'Deaths',
            style: `${styles.card} ${styles.deaths}`,
            endVal: deaths.value,
            description: 'Number of deaths caused by COVID-19'
        },
    ]

    if(!confirmed){
        return 'Loading...'
    }
    return (
        <div className={styles.container}>
            <Grid container spacing={3} justifyContent="center">
                {cardInfo.map((card, i) => (
                    <Grid item component={Card} xs={12} md={3} className={card.style} key={i}>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>{card.title}</Typography>
                            <Typography variant="h5">
                                <CountUp
                                    start={0}
                                    end={card.endVal}
                                    duration={2.5}
                                    separator=","
                                />
                            </Typography>
                            <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
                            <Typography variant="body2">{card.description}</Typography>
                        </CardContent>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}

export default Cards
