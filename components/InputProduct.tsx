import React, { useState } from 'react'
import {
    TextField,
    FormControl,
    Button
} from '@material-ui/core';

//Styling
import styles from '../styles/Products.module.css'

type IProduct = {
    name: string
}

const InputProduct: React.FC<IProduct> = ({ name }) => {

    return (
        <FormControl >

            <TextField
                id={name}
                label={name}
            />
        </FormControl>


    )
}

export default InputProduct

