import React, { useState } from 'react'
import { TextField, FormControl, Button } from '@material-ui/core';

//Styling
import styles from '../styles/Products.module.css'


const About: React.FC = () => {
    const [tomato, setTomato] = useState('')

    const handleClick = (e: React.FormEvent) => {
        e.preventDefault()
        fetch('/api/products', {
            method: 'POST',
            headers: {
                'Content-type': 'application.json'
            },
            body: JSON.stringify({ value: tomato })
        })
            .then(resp => resp.json())
            .then(data => console.log('response from the server', data))
    }

    return (
        <div className={styles.container}>
            <FormControl >
                <TextField value={tomato} onChange={e => setTomato(e.target.value)}
                    id="tomato" label="Tomato"
                />

            </FormControl>
            <Button
                onClick={handleClick}
                className={styles.button} variant="outlined" color="primary"
            >Submit</Button>
        </div>
    )
}

export default About
