//React
import React, { useContext } from 'react'

//Context
import { ProductsContext } from '../contexts/ProductsContext'

//Material UI
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles';

//Icons
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

type IProduct = {
    name: string,
    amount: number
    id: string
}

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '8px',
        display: 'flex',
        flexDirection: 'row'
    }
}));

const InputProduct: React.FC<IProduct> = ({ name, amount, id }) => {
    const classes = useStyles();
    const { deleteProduct } = useContext(ProductsContext)

    return (
        <FormControl
            className={classes.root}
            fullWidth
        >

            <TextField

                id={name}
                label={name}
                color="primary"
                value={amount}
                variant='standard'
                fullWidth
            />

            <IconButton>
                <EditIcon />
            </IconButton>


            <IconButton onClick={e => { if (deleteProduct !== undefined) deleteProduct(id) }}>
                <DeleteIcon />
            </IconButton>



        </FormControl >


    )
}

export default InputProduct

