"use client";
//React
import React, { useState, useContext } from "react";
import { useRouter } from "next/navigation";

//Components
import NavbarDrawer from "../../components/NavbarDrawer";
import MoreIconMenu from "../../components/MoreIconMenu";

//Context
import { UserContext } from "../../contexts/UserContext";
import { CategoriesContext } from "../../contexts/CategoriesContext";

//Material UI
import clsx from "clsx";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import Slide from "@mui/material/Slide";

import Button from "@mui/material/Button";

//Icons
import MenuIcon from "@mui/icons-material/Menu";
import MoreIcon from "@mui/icons-material/MoreVert";

//Constant
import { DRAWER_WIDTH } from "../../constants/dimensions";

//Styles
import {
  rootStyle,
  drawerStyle,
  drawerPaperStyle,
  hideStyle,
  appBarStyle,
  appBarShiftStyle,
  activeSubMenuStyle,
  menuButtonStyle,
  linkButtonStyle,
  titleStyle,
  toolbarStyle,
  permanentDrawerStyle,
  temporaryDrawerStyle,
} from "./Navbar.style";

const Navbar: React.FC = () => {
  const { loggedIn, logout } = useContext(UserContext);
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
  if (!categories) return <></>;
  //className={rootStyle}
  return (
    <Box component="section" className={clsx({}, { [rootStyle]: loggedIn })}>
      <AppBar
        position="sticky"
        className={clsx(appBarStyle, { [appBarShiftStyle]: loggedIn })}
      >
        <Toolbar>
          {/*https:github.com/mui/material-ui/issues/4532*
         To try React.memo the button
 */}
          {/* <MemoIconButton /> */}
          <IconButton
            color="inherit"
            arial-label="open drawer"
            edge="start"
            disableRipple
            onClick={() => setMobileOpen(true)}
            className={clsx(menuButtonStyle, mobileOpen && hideStyle)}
          >
            <MenuIcon />
          </IconButton>

          <Button
            className={titleStyle}
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
          </IconButton> */}
          <MoreIconMenu
            anchorEl={anchorEl}
            handleOnClose={handleCloseMoreIconMenu}
          />
          {loggedIn && (
            <Button
              className={linkButtonStyle}
              color="inherit"
              onClick={() => handleLogoutClick()}
            >
              Logout
            </Button>
          )}
          {!loggedIn && (
            <Button
              className={linkButtonStyle}
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
        <nav className={drawerStyle} aria-label="menu">
          <Drawer
            variant="temporary"
            anchor="left"
            classes={{ paper: drawerPaperStyle }}
            className={temporaryDrawerStyle}
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
            ModalProps={{ keepMounted: true }}
          >
            <NavbarDrawer categories={categories} />
          </Drawer>
          <Slide direction="left" in={true}>
            <Drawer
              open
              variant="permanent"
              className={permanentDrawerStyle}
              classes={{ paper: drawerPaperStyle }}
            >
              <NavbarDrawer categories={categories} />
            </Drawer>
          </Slide>
        </nav>
      )}
    </Box>
  );
};

export default Navbar;
