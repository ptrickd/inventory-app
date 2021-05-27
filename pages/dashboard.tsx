import React, { useState } from 'react'

//Components
import AddCategoryForm from '../components/AddCategoryForm'


//Material UI
import { makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItemText from '@material-ui/core/ListItemText'
import ListItem from '@material-ui/core/ListItem'

//Icons
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'

const drawerWidth = 120


const useStyles = makeStyles({
    root: {
        display: 'flex',
        marginTop: 60,
        marginLeft: drawerWidth,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
function Dashboard() {
    const classes = useStyles()
    const [openModal, setOpenModal] = useState(false)

    //Adding categories
    const handleAddCategory = () => setOpenModal(true)

    return (
        <Container className={classes.root}>
            <List >
                <Typography
                    variant='h4'
                >Dashboard</Typography>
                <Divider />
                <ListItem>
                    <IconButton
                        aria-label='add category'
                        color='primary'
                        onClick={handleAddCategory}
                    >
                        <AddIcon />
                    </IconButton>
                    <ListItemText
                        primary='Add category'
                    />

                </ListItem>

                {/* <TextField
                    id='test'
                    label='ADD'
                    color="primary"

                    variant='standard'
                /> */}
            </List>

            <AddCategoryForm />
        </Container >
    )
}

export default Dashboard
