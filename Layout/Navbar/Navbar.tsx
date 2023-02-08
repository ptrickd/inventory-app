//React
import React, { useState, useContext } from "react";
import { useRouter } from "next/router";

//Components
import NavbarDrawer from "../../components/NavbarDrawer";

//Context
import { UserContext } from "../../contexts/UserContext";
import { CategoriesContext } from "../../contexts/CategoriesContext";

//Material UI
import clsx from "clsx";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";

//Icons
import MenuIcon from "@mui/icons-material/Menu";
import MoreIcon from "@mui/icons-material/MoreVert";

//Styles
import { classes, Root } from "./Navbar.style";

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
