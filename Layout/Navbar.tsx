import { useState, useEffect } from 'react'

//Material UI
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Divider from '@material-ui/core/Divider';
import CssBaseline from '@material-ui/core/CssBaseline';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Slide from '@material-ui/core/Slide';
import Link from 'next/link'

interface ICategory {
    _id: string
    name: string
}

const drawerWidth = 220

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        display: 'flex'
    },
    title: {
        flexGrow: 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth
    },
    appBar: {

        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),

    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    subMenu: {
        marginLeft: theme.spacing(2),
    },
    activeSubMenu: {
        marginLeft: theme.spacing(2),
        backgroundColor: '#f4f4f4'
    }

}));





const Navbar = () => {
    const classes = useStyles();
    const [categoryMenu, setCategoryMenu] = useState(false)
    const [categories, setCategories] = useState([])



    useEffect(() => {
        fetch('/api/category')
            .then(resp => resp.json())
            .then(data => setCategories(data))
            .catch(err => console.log('Error: ', err))
    }, [])

    const handleCategoryClick = () => {

    }

    const renderedCategories = () => {
        return categories.map((category: ICategory) => {
            return <Link href={`/product/${category._id}`}>
                <ListItem
                    onClick={handleCategoryClick}
                    className={classes.subMenu}
                    button key={category._id}
                >
                    <ListItemText primary={category.name} />
                    <ListItemIcon><ArrowForwardIcon /></ListItemIcon>
                </ListItem>
            </Link>
        })
    }

    const handleClickCategories = () => {
        setCategoryMenu(!categoryMenu)
    }

    return <div className={classes.root}>
        <CssBaseline />
        <AppBar
            className={classes.appBar}
        >
            <Toolbar >
                <Typography variant="h6" >
                    Inventory
            </Typography>
            </Toolbar>
        </AppBar>

        <Drawer
            className={classes.drawer}
            variant='permanent'
            anchor='left'
            classes={{ paper: classes.drawerPaper }}
        >
            <div className={classes.toolbar} />
            <Divider />
            <List>
                <Link href='/dashboard'>
                    <ListItem button>
                        <ListItemText primary='Dashboard' />
                        <ListItemIcon><ArrowForwardIcon /></ListItemIcon>
                    </ListItem>
                </Link>

                <Divider />
                <ListItem button onClick={handleClickCategories}>
                    <ListItemText primary='Categories' />
                    <ListItemIcon >
                        {categoryMenu ? <RemoveCircleIcon /> : <AddCircleIcon />}
                    </ListItemIcon>
                </ListItem>

                {
                    categoryMenu && <Slide direction="down" in={categoryMenu} mountOnEnter unmountOnExit><List>
                        {renderedCategories()}
                    </List></Slide>
                }
            </List>



            <Divider />

        </Drawer>




    </div>
}

export default Navbar