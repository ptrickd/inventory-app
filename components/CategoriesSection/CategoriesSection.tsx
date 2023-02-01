//React
import React, { useState } from "react";

//Components
import AddCategoryForm from "../../components/AddCategoryForm";

//Material UI
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";

//Styles
import { classes, Section } from "./CategoriesSection.style";

//Types
interface IProps {
  listOfCategories: string[] | [];
}

const CategoriesSection = ({ listOfCategories }: IProps) => {
  const [openModal, setOpenModal] = useState(false);

  //Adding categories
  const handleAddCategory = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <Section className={classes.section} component="section">
      <IconButton
        aria-label="add category"
        color="primary"
        onClick={handleAddCategory}
      >
        <AddIcon color="primary" />
      </IconButton>

      <Typography>Add Category</Typography>

      <List>
        {listOfCategories.map((item) => {
          return <ListItem key={item}>{item}</ListItem>;
        })}
      </List>
      <AddCategoryForm open={openModal} handleCloseModal={handleCloseModal} />
    </Section>
  );
};

export default CategoriesSection;
