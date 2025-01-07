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
// import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";

//Icons
import MenuIcon from "@mui/icons-material/Menu";
import MoreIcon from "@mui/icons-material/MoreVert";

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
} from "./Navbar.style";

const Navbar = () => {
  const { loggedIn, logout } = useContext(UserContext);
  const { categories } = useContext(CategoriesContext);
  const [mobileOpen, setMobileOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // const router = useRouter();0

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
  //className={rootStyle}
  return (
    <section>
      <Typography variant="h6">hdhdhddh</Typography>
      {/* */}
      {/*Code comes here*/}
    </section>
  );
};

export default Navbar;

//     <AppBar className={clsx(appBarStyle, { [appBarShiftStyle]: loggedIn })}>
//       <Toolbar>
//         {/*https://github.com/mui/material-ui/issues/4532*
//         To try React.memo the button
// */}
//         {/* <MemoIconButton /> */}
//         <IconButton
//           color="inherit"
//           arial-label="open drawer"
//           edge="start"
//           className={clsx(menuButtonStyle, mobileOpen && hideStyle)}
//           // disableRipple
//           onClick={() => setMobileOpen(true)}
//         >
//           <MenuIcon />
//         </IconButton>

//         <Button
//           className={titleStyle}
//           color="inherit"
//           onClick={() => {
//             router.push("/");
//           }}
//         >
//           <Typography variant="h6">Inventory</Typography>
//         </Button>

//         {/* Keep this code for later */}
//         {/* <IconButton
//                   aria-label="display more action"
//                   edge="end"
//                   color="inherit"
//                   onClick={handleClickOnMoreIconMenu}
//               >
//                   <MoreIcon />
//               </IconButton>
//               <MoreIconMenu anchorEl={anchorEl} handleOnClose={handleCloseMoreIconMenu} /> */}
//         {loggedIn && (
//           <Button
//             className={linkButtonStyle}
//             color="inherit"
//             onClick={() => handleLogoutClick()}
//           >
//             Logout
//           </Button>
//         )}
//         {!loggedIn && (
//           <Button
//             className={linkButtonStyle}
//             color="inherit"
//             onClick={() => {
//               router.push("/login");
//             }}
//           >
//             Login
//           </Button>
//         )}
//       </Toolbar>
//     </AppBar>
//     {loggedIn && (
//       <nav className={drawerStyle} aria-label="menu">
//         <Drawer
//           sx={{ display: { xs: "block", sm: "none" } }}
//           variant="temporary"
//           anchor="left"
//           classes={{ paper: drawerPaperStyle }}
//           open={mobileOpen}
//           onClose={() => setMobileOpen(false)}
//           ModalProps={{ keepMounted: true }}
//         >
//           <NavbarDrawer categories={categories} />
//         </Drawer>
//         <Drawer
//           sx={{ display: { xs: "none", sm: "block" } }}
//           open
//           variant="permanent"
//           classes={{ paper: drawerPaperStyle }}
//         >
//           <NavbarDrawer categories={categories} />
//         </Drawer>
//       </nav>
//     )}
