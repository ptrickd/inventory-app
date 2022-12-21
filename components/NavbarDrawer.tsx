//React
import { Fragment, useState } from "react";
import Link from "next/link";

//Material UI
import { makeStyles, Theme, createStyles } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
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
//Types
interface ICategory {
  id: string;
  name: string;
}

interface IProps {
  categories: ICategory[] | [];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menu: {
      color: TEXT_MENU_COLOR,
    },
    menuIcon: {
      color: TEXT_MENU_COLOR,
    },
    subMenu: {
      marginLeft: theme.spacing(2),
      color: TEXT_MENU_COLOR,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
  })
);

const NavbarDrawer = ({ categories }: IProps) => {
  const classes = useStyles();
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
    <Fragment>
      {/* //Add the primary color on the top on the sidebar side */}

      <div className={classes.toolbar} />

      <Divider />

      <List>
        <Link href="/dashboard">
          <span className={classes.menu}>
            <ListItem button key="dashboard">
              <ListItemText primary="Dashboard" />
              <ListItemIcon className={classes.menuIcon}>
                <ArrowForwardIcon />
              </ListItemIcon>
            </ListItem>
          </span>
        </Link>

        <span className={classes.menu}>
          <ListItem>
            <NavbarReportsList />
          </ListItem>
        </span>

        <Divider />
        <span className={classes.menu}>
          <ListItem button onClick={handleClickCategories} key="category">
            <ListItemText primary="Categories" />
            <ListItemIcon className={classes.menuIcon}>
              {categoryMenu ? <RemoveCircleIcon /> : <AddCircleIcon />}
            </ListItemIcon>
          </ListItem>
        </span>

        {categoryMenu && (
          <Slide direction="down" in={categoryMenu} mountOnEnter unmountOnExit>
            <List>{renderedCategories()}</List>
          </Slide>
        )}
      </List>
      <Divider />
    </Fragment>
  );
};

export default NavbarDrawer;
