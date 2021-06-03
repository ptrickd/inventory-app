import React, { useState } from 'react'
import {
    TextField,
    FormControl,
    Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


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
    const classes = useStyles();
    return (
        <FormControl
            className={classes.root}
        >

            <TextField

                id={name}
                label={name}
                color="primary"
                value={amount}
                variant='standard'
                fullWidth
            />
        </FormControl>


    )
}

export default InputProduct

