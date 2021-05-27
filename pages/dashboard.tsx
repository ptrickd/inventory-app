import React from 'react'
import styles from '../styles/Home.module.css'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'

function Dashboard() {
    //Adding categories

    return (
        <Container className={styles.container}>
            <h2>Dashboard</h2>
            <TextField primary='Add a cat'/>
        </Container>
    )
}

export default Dashboard
