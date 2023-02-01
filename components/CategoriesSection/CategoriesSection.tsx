//React
import React, { useState } from "react";

//Components
import AddCategoryForm from "../../components/AddCategoryForm";

//Material UI
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

//Material Icon
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";

//Styles
import {
  classes,
  Section,
  HorizontalBox,
  StyledCollapse,
  StyledButton,
} from "./CategoriesSection.style";

//Types
interface IProps {
  listOfCategories: string[] | [];
}

const CategoriesSection = ({ listOfCategories }: IProps) => {
  const [openModal, setOpenModal] = useState(false);
  const [showList, setShowList] = useState(false);

  //Adding categories
  const handleAddCategory = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <Section className={classes.section} component="section">
      <HorizontalBox component="div" className={classes.horizontalBox}>
        <IconButton
          aria-label="add category"
          color="primary"
          onClick={handleAddCategory}
          sx={{ padding: 0 }}
        >
          <AddIcon color="primary" />
        </IconButton>

        <Typography variant="body1" sx={{ padding: 0, paddingLeft: 1 }}>
          Add Category
        </Typography>

        <StyledButton
          onClick={() => setShowList(!showList)}
          className={classes.styledButton}
        >
          <Typography variant="body1" color="primary">
            {listOfCategories.length}
          </Typography>
        </StyledButton>
      </HorizontalBox>

      <StyledCollapse in={showList} className={classes.styledCollapse}>
        <List>
          {listOfCategories.map((item) => {
            return <ListItem key={item}>{item}</ListItem>;
          })}
        </List>
      </StyledCollapse>

      <AddCategoryForm open={openModal} handleCloseModal={handleCloseModal} />
    </Section>
  );
};

export default CategoriesSection;
