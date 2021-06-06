import React, { useState } from 'react'

//Components
import AddCategoryForm from '../components/AddCategoryForm'


//Material UI
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItemText from '@material-ui/core/ListItemText'
import ListItem from '@material-ui/core/ListItem'
import { DRAWER_WIDTH } from '../constants/dimensions'

//Icons
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'

//Graphql
import { useQuery, gql } from '@apollo/client'



const QUERY = gql`
  query Category {
    addCategories {
      name
    }
  }
`;


const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        display: 'flex',
        marginTop: 60,
        marginLeft: DRAWER_WIDTH,
        alignItems: 'center',
        justifyContent: 'center'
    }
}))
function Dashboard() {
    const classes = useStyles()
    const [openModal, setOpenModal] = useState(false)

    const { data, loading, error } = useQuery(QUERY);

    if (loading) {
        return <h2>Loading...</h2>;
    }

    // if (error) {
    //     console.error(error);
    //     return null;
    // }

    //Adding categories
    const handleAddCategory = () => setOpenModal(true)
    const handleCloseModal = () => setOpenModal(false)


    return (
        <Container className={classes.root}>
            <List >
                <Typography variant='h4' >
                    Dashboard
                </Typography>
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


            </List>

            <AddCategoryForm open={openModal} handleCloseModal={handleCloseModal} />
            {/* <h6 style={{ display: 'block' }}>Create new inventory form</h6> */}
        </Container >
    )
}

export default Dashboard
