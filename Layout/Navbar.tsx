//React
import React, { useState, useContext } from "react";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import { useRouter } from "next/router";

//Components
import NavbarDrawer from "../components/NavbarDrawer";

//Context
import { UserContext } from "../contexts/UserContext";

//Material UI
import clsx from "clsx";
import { DRAWER_WIDTH } from "../constants/dimensions";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import { indigo } from "@mui/material/colors";

//Icons
import MenuIcon from "@mui/icons-material/Menu";
import MoreIcon from "@mui/icons-material/MoreVert";
import { CategoriesContext } from "../contexts/CategoriesContext";
const PREFIX = "Navbar";

const classes = {
  root: `${PREFIX}-root`,
  drawer: `${PREFIX}-drawer`,
  drawerPaper: `${PREFIX}-drawerPaper`,
  hide: `${PREFIX}-hide`,
  appBar: `${PREFIX}-appBar`,
  appBarShift: `${PREFIX}-appBarShift`,
  toolbar: `${PREFIX}-toolbar`,
  activeSubMenu: `${PREFIX}-activeSubMenu`,
  menuButton: `${PREFIX}-menuButton`,
  title: `${PREFIX}-title`,
};

const Root = styled("div")(({ theme }) => ({
  [`&.${classes.root}`]: {
    flexGrow: 1,
    height: "100%",
  },

  [`& .${classes.drawer}`]: {
    width: DRAWER_WIDTH,
    flexShrink: 0,
  },

  [`& .${classes.drawerPaper}`]: {
    width: DRAWER_WIDTH,
    background: indigo[800],
  },

  [`& .${classes.hide}`]: {
    display: "none",
  },

  [`& .${classes.appBar}`]: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },

  [`& .${classes.appBarShift}`]: {
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
  [`& .${classes.toolbar}`]: theme.mixins.toolbar,

  [`& .${classes.activeSubMenu}`]: {
    marginLeft: theme.spacing(2),
    // backgroundColor: "#f4f4f4",
    backgroundColor: indigo[500],
  },

  [`& .${classes.menuButton}`]: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },

  [`& .${classes.title}`]: {
    flexGrow: 1,
    // selfAlign: "flex-start",
    // marginLeft: 0,
    // paddingLeft: 0,
    cursor: "pointer",
  },
}));

const Navbar = () => {
  const { loggedIn, logout, currentUser } = useContext(UserContext);
  const { categories } = useContext(CategoriesContext);
  const [mobileOpen, setMobileOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const router = useRouter();

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

  // const renderedIconButton = () => {
  //   return (
  //     <IconButton
  //       color="inherit"
  //       arial-label="open drawer"
  //       edge="start"
  //       className={clsx(classes.menuButton, mobileOpen && classes.hide)}
  //       // disableRipple
  //       onClick={() => setMobileOpen(true)}
  //     >
  //       <MenuIcon />
  //     </IconButton>
  //   );
  // };
  // const MemoIconButton = React.memo(renderedIconButton);
  if (!categories) return null;
  return (
    <Root className={classes.root}>
      <CssBaseline />
      <AppBar
        className={clsx(classes.appBar, { [classes.appBarShift]: loggedIn })}
      >
        <Toolbar>
          {/*https://github.com/mui/material-ui/issues/4532*
          To try React.memo the button
  */}
          {/* <MemoIconButton /> */}
          <IconButton
            color="inherit"
            arial-label="open drawer"
            edge="start"
            className={clsx(classes.menuButton, mobileOpen && classes.hide)}
            // disableRipple
            onClick={() => setMobileOpen(true)}
          >
            <MenuIcon />
          </IconButton>

          <Button
            sx={{ alignItem: "flex-start" }}
            className={classes.title}
            color="inherit"
            onClick={() => {
              router.push("/");
            }}
          >
            <Typography variant="h6">Inventory</Typography>
          </Button>

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
            <Button
              sx={{}}
              color="inherit"
              onClick={() => {
                router.push("/login");
              }}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      {loggedIn && (
        <nav className={classes.drawer} aria-label="menu">
          <Drawer
            sx={{ display: { xs: "block", sm: "none" } }}
            variant="temporary"
            anchor="left"
            classes={{ paper: classes.drawerPaper }}
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
            ModalProps={{ keepMounted: true }}
          >
            <NavbarDrawer categories={categories} />
          </Drawer>
          <Drawer
            sx={{ display: { xs: "none", sm: "block" } }}
            open
            variant="permanent"
            classes={{ paper: classes.drawerPaper }}
          >
            <NavbarDrawer categories={categories} />
          </Drawer>
        </nav>
      )}
    </Root>
  );
};

export default Navbar;
