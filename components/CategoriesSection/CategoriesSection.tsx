//React
import React from "react";

//Material UI
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import AddIcon from "@mui/icons-material/Add";

//Styles
import { classes, Section } from "./CategoriesSection.style";

//Types
interface IProps {
  listOfCategories: string[] | [];
}

const CategoriesSection = ({ listOfCategories }: IProps) => {
  return (
    <Section className={classes.section} component="section">
      <AddIcon color="primary" />
      <Typography>Add Category</Typography>

      <List>
        {listOfCategories.map((item) => {
          return <ListItem key={item}>{item}</ListItem>;
        })}
      </List>
    </Section>
  );
};

export default CategoriesSection;
