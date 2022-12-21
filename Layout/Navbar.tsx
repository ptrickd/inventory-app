//React
import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";

//Components
import NavbarDrawer from "../components/NavbarDrawer";

//Context
import { UserContext } from "../contexts/UserContext";

//Material UI
import clsx from "clsx";
import { DRAWER_WIDTH } from "../constants/dimensions";
import makeStyles from "@mui/styles/makeStyles";
import { Theme, createStyles } from "@mui/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Hidden from "@mui/material/Hidden";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import blueGrey from "@mui/material/colors/blueGrey";
import indigo from "@mui/material/colors/indigo";

//Icons
import MenuIcon from "@mui/icons-material/Menu";
import MoreIcon from "@mui/icons-material/MoreVert";
import { CategoriesContext } from "../contexts/CategoriesContext";
//

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      height: "100%",
    },
    drawer: {
      width: DRAWER_WIDTH,
      flexShrink: 0,
    },
    drawerPaper: {
      width: DRAWER_WIDTH,
      background: indigo[800],
    },
    hide: {
      display: "none",
    },
    appBar: {
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      [theme.breakpoints.up("sm")]: {
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        marginLeft: DRAWER_WIDTH,
      },
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    activeSubMenu: {
      marginLeft: theme.spacing(2),
      backgroundColor: "#f4f4f4",
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    title: {
      flexGrow: 1,
      cursor: "pointer",
    },
  })
);

const Navbar = () => {
  const classes = useStyles();
  const { loggedIn, logout, currentUser } = useContext(UserContext);
  const { categories } = useContext(CategoriesContext);
  const [mobileOpen, setMobileOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // if (loading) return null
  // if (error) return <div>`Error! ${error.message}`</div>
  // console.log(data)
  // const categories = data && data.categories ? data.categories : []

  //Keep those for the icon more menu
  const handleClickOnMoreIconMenu = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl(e.currentTarget);
  };
  const handleCloseMoreIconMenu = () => {
    setAnchorEl(null);
  };
  const handleLogoutClick = () => {
    if (logout !== undefined) logout();
  };

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  if (!categories) return null;
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        className={clsx(classes.appBar, { [classes.appBarShift]: loggedIn })}
      >
        <Toolbar>
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
            <Typography variant="h6" className={classes.title}>
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
          {loggedIn && (
            <Button color="inherit" onClick={() => handleLogoutClick()}>
              Logout
            </Button>
          )}
          {!loggedIn && (
            <Link href="/login">
              <Button color="inherit">Login</Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
      {loggedIn && (
        <nav className={classes.drawer} aria-label="menu">
          <Hidden smUp implementation="css">
            <Drawer
              variant="temporary"
              anchor="left"
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
      )}
    </div>
  );
};

export default Navbar;
