//React
import React, { useState } from "react";
import Link from "next/link";

//Components
import AddCategoryForm from "../../components/AddCategoryForm";
import MessageModal from "../MessageModal";

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
  StyledLink,
} from "./CategoriesSection.style";

//Types
interface ICategory {
  id: string;
  name: string;
}
interface IProps {
  listOfCategories: ICategory[] | [];
}

const CategoriesSection = ({ listOfCategories }: IProps) => {
  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const [showList, setShowList] = useState(false);
  const [openMessageModal, setOpenMessageModal] = useState(false);
  const [message, setMessage] = useState("");
  const [isMessageError, setIsMessageError] = useState(false);
  //Adding categories
  const handleAddCategory = () => setOpenCategoryModal(true);
  const handleCloseCategoryForm = (data: any) => {
    if (data?.id) {
      setMessage(`The ${data.name} category as been created.`);
      setOpenMessageModal(true);
    } else if (data?.error) {
      setMessage(data.error);
      setOpenMessageModal(true);
      setIsMessageError(true);
    }
    setOpenCategoryModal(false);
  };

  //Response message
  const handleMessageModalClicked = () => {
    setMessage("");
    setOpenMessageModal(false);
    setIsMessageError(false);
  };

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
            return (
              <ListItem key={item.id}>
                <Link href={`/category/${item.id}`} key={item.id}>
                  {item.name}
                </Link>
              </ListItem>
            );
          })}
        </List>
      </StyledCollapse>

      <AddCategoryForm
        open={openCategoryModal}
        handleCloseModal={handleCloseCategoryForm}
      />
      <MessageModal
        open={openMessageModal}
        message={message}
        isError={isMessageError}
        handleClick={handleMessageModalClicked}
      />
    </Section>
  );
};

export default CategoriesSection;
