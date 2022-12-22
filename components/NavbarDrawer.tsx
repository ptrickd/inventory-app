//React
import { Fragment, useState } from "react";
import { styled } from "@mui/material/styles";
import Link from "next/link";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";

import Divider from "@mui/material/Divider";
import Slide from "@mui/material/Slide";

//Color
import { TEXT_MENU_COLOR } from "../constants/colors";

//Icons
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AddCircleIcon from "@mui/icons-material/AddCircle";

//Components
import NavbarReportsList from "./NavbarReportsList";
const PREFIX = "NavbarDrawer";

const classes = {
  menu: `${PREFIX}-menu`,
  menuIcon: `${PREFIX}-menuIcon`,
  subMenu: `${PREFIX}-subMenu`,
  toolbar: `${PREFIX}-toolbar`,
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled("div")(({ theme: Theme }) => ({
  [`& .${classes.menu}`]: {
    color: TEXT_MENU_COLOR,
  },

  [`& .${classes.menuIcon}`]: {
    color: TEXT_MENU_COLOR,
  },

  [`& .${classes.subMenu}`]: {
    marginLeft: Theme.spacing(2),
    color: TEXT_MENU_COLOR,
  },

  // necessary for content to be below app bar
  [`& .${classes.toolbar}`]: Theme.mixins.toolbar,
}));

//Types
interface ICategory {
  id: string;
  name: string;
}

interface IProps {
  categories: ICategory[] | [];
}

const NavbarDrawer = ({ categories }: IProps) => {
  const [categoryMenu, setCategoryMenu] = useState(false);
  const handleClickCategories = () => setCategoryMenu(!categoryMenu);
  const renderedCategories = () => {
    return categories.map((category: ICategory) => {
      // console.log(category)
      return (
        <Link href={`/category/${category.id}`} key={category.id}>
          <ListItem className={classes.subMenu} button>
            <ListItemText primary={category.name} />
            <ListItemIcon className={classes.menuIcon}>
              <ArrowForwardIcon />
            </ListItemIcon>
          </ListItem>
        </Link>
      );
    });
  };
  return (
    <Root>
      {/* //Add the primary color on the top on the sidebar side */}

      <div className={classes.toolbar} />

      <Divider />

      <List>
        <Link href="/dashboard">
          <span className={classes.menu}>
            <ListItemButton key="dashboard">
              <ListItemText primary="Dashboard" />
              <ListItemIcon className={classes.menuIcon}>
                <ArrowForwardIcon />
              </ListItemIcon>
            </ListItemButton>
          </span>
        </Link>

        <span className={classes.menu}>
          <ListItem>
            <NavbarReportsList />
          </ListItem>
        </span>

        <Divider />
        <span className={classes.menu}>
          <ListItemButton onClick={handleClickCategories} key="category">
            <ListItemText primary="Categories" />
            <ListItemIcon className={classes.menuIcon}>
              {categoryMenu ? <RemoveCircleIcon /> : <AddCircleIcon />}
            </ListItemIcon>
          </ListItemButton>
        </span>

        {categoryMenu && (
          <Slide direction="down" in={categoryMenu} mountOnEnter unmountOnExit>
            <List>{renderedCategories()}</List>
          </Slide>
        )}
      </List>
      <Divider />
    </Root>
  );
};

export default NavbarDrawer;
