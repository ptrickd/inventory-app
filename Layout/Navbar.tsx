//React
import React, { useState, useEffect, useContext } from 'react'
import Link from 'next/link'

//Components
import NavbarDrawer from '../components/NavbarDrawer'

//Context
import { UserContext } from '../contexts/UserContext'

//Material UI
import clsx from 'clsx'
import { DRAWER_WIDTH } from '../constants/dimensions'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Hidden from '@material-ui/core/Hidden'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import Button from '@material-ui/core/Button'
import grey from '@material-ui/core/colors/grey'
import blueGrey from '@material-ui/core/colors/blueGrey'
//Icons
import MenuIcon from '@material-ui/icons/Menu'
import MoreIcon from '@material-ui/icons/MoreVert'

//GraphQL
import { useQuery } from '@apollo/client'
import { GET_CATEGORIES } from '../graphql/queries'

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        flexGrow: 1,
        height: '100%'
    },
    drawer: {
        width: DRAWER_WIDTH,
        flexShrink: 0,

    },
    drawerPaper: {
        width: DRAWER_WIDTH,
        background: blueGrey[700]
    },
    hide: {
        display: 'none',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        })
    },
    appBarShift: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${DRAWER_WIDTH}px)`,
            marginLeft: DRAWER_WIDTH,
        },
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    activeSubMenu: {
        marginLeft: theme.spacing(2),
        backgroundColor: '#f4f4f4'
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    title: {
        flexGrow: 1,
        cursor: 'pointer'
    }

}));


const Navbar = () => {
    const classes = useStyles();
    const { loggedIn } = useContext(UserContext)

    const [mobileOpen, setMobileOpen] = useState(false)

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

    const { data, loading, error } = useQuery(GET_CATEGORIES)
    if (loading) return null
    if (error) return <div>`Error! ${error.message}`</div>
    // console.log(data)
    const categories = data.categories || []

    //Keep those for the icon more menu
    const handleClickOnMoreIconMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(e.currentTarget)
    }
    const handleCloseMoreIconMenu = () => { setAnchorEl(null) }



    const handleDrawerToggle = () => setMobileOpen(!mobileOpen)

    return <div className={classes.root}>
        <CssBaseline />
        <AppBar
            className={clsx(classes.appBar, { [classes.appBarShift]: loggedIn })}
        >
            <Toolbar >
                <IconButton
                    color="inherit"
                    arial-label="open drawer"
                    edge="start"
                    className={clsx(classes.menuButton, mobileOpen && classes.hide)}
                    onClick={handleDrawerToggle}
                >
                    <MenuIcon />
                </IconButton>
                <Link href="/">
                    <Typography variant="h6" className={classes.title} >
                        Inventory
                    </Typography>
                </Link>
                {/* Keep this code for later */}
                {/* <IconButton
                    aria-label="display more action"
                    edge="end"
                    color="inherit"
                    onClick={handleClickOnMoreIconMenu}
                >
                    <MoreIcon />
                </IconButton>
                <MoreIconMenu anchorEl={anchorEl} handleOnClose={handleCloseMoreIconMenu} /> */}
                {
                    loggedIn &&
                    <Link href="/">
                        <Button color="inherit" >
                            Logout
                        </Button>
                    </Link>
                }
                {
                    !loggedIn &&
                    <Link href="/login">
                        <Button color="inherit" >
                            Login
                        </Button>
                    </Link>
                }
            </Toolbar>
        </AppBar>
        {
            loggedIn &&
            <nav className={classes.drawer} aria-label="menu">

                <Hidden smUp implementation="css">

                    <Drawer
                        variant='temporary'
                        anchor='left'
                        classes={{ paper: classes.drawerPaper }}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{ keepMounted: true }}
                    >

                        <NavbarDrawer categories={categories} />

                    </Drawer>


                </Hidden>
                <Hidden xsDown implementation="css">

                    <Drawer
                        open
                        variant="permanent"
                        classes={{ paper: classes.drawerPaper }}
                    >

                        <NavbarDrawer categories={categories} />

                    </Drawer>

                </Hidden>


            </nav>
        }

    </div >
}

export default Navbar