//React
import { useState } from "react";
import Link from "next/link";

//Material UI
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";

import Divider from "@mui/material/Divider";
import Slide from "@mui/material/Slide";

import Toolbar from "@mui/material/Toolbar";

//Style
import { rootStyle, menuStyle, listItemTextStyle } from "./NavbarDrawer.style";

//Icons
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AddCircleIcon from "@mui/icons-material/AddCircle";

//Components
import NavbarReportsList from "../NavbarReportsList";

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
          <ListItemButton>
            <ListItemText
              primary={category.name}
              className={listItemTextStyle}
            />
            <ListItemIcon>
              <ArrowForwardIcon />
            </ListItemIcon>
          </ListItemButton>
        </Link>
      );
    });
  };
  return (
    <div className={rootStyle}>
      {/* //Add the primary color on the top on the sidebar side */}

      <Toolbar />
      <Divider />

      <List>
        <Link href="/dashboard">
          <span className={menuStyle}>
            <ListItemButton key="dashboard">
              <ListItemText primary="Dashboard" />
              <ListItemIcon>
                <ArrowForwardIcon />
              </ListItemIcon>
            </ListItemButton>
          </span>
        </Link>

        <span className={menuStyle}>
          <ListItem>
            <NavbarReportsList />
          </ListItem>
        </span>

        <Divider />
        <span className={menuStyle}>
          <ListItemButton onClick={handleClickCategories} key="category">
            <ListItemText primary="Categories" />
            <ListItemIcon>
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
    </div>
  );
};

export default NavbarDrawer;
