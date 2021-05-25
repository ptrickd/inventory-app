//Material UI
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Link from 'next/link'
import { Fragment } from 'react'

import styles from '../styles/Navbar.module.css'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },

}));


const Navbar = () => {
    const classesUI = useStyles();


    return <Fragment >

        <AppBar className={classesUI.root} position="static">
            <Toolbar>
                <IconButton className={classesUI.menuButton} edge="start" color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Typography className={classesUI.title} variant="h6" >
                    Inventory
                </Typography>
                <Link href='/dashboard'>
                    <a className={styles.link} >Dashboard</a>
                </Link>
                <Link href='/products'>
                    <a className={styles.link}>Products</a>
                </Link>
                <Link href='/setting'>
                    <a className={styles.link}>Setting</a>
                </Link>
                <Link href='/login'>
                    <a className={styles.link}>Login</a>
                </Link>

            </Toolbar>
        </AppBar>
    </Fragment>
}

export default Navbar