import React, { useState } from 'react'
import {
    TextField,
    FormControl,
    Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
//Styling
import styles from '../styles/Products.module.css'

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '8px'
    }

}));

type IProduct = {
    name: string,
    amount: number
}

const InputProduct: React.FC<IProduct> = ({ name, amount }) => {
    const classesUI = useStyles();
    return (
        <FormControl >

            <TextField

                id={name}
                label={name}
                color="primary"
                value={amount}
                variant='standard'
            />
        </FormControl>


    )
}

export default InputProduct

