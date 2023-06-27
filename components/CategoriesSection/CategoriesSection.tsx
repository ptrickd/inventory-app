//React
import React, { useState } from "react";
import Link from "next/link";

//Components
import AddCategoryForm from "../../components/AddCategoryForm";
import MessageModal from "../MessageModal";
import ListItem from "@mui/material/ListItem";

//Material UI
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";

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
  StyledPaper,
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
  //Theming
  const theme = useTheme();

  //useState
  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const [showList, setShowList] = useState(false);
  const [openMessageModal, setOpenMessageModal] = useState(false);
  const [message, setMessage] = useState("");
  const [isMessageError, setIsMessageError] = useState(false);

  //Adding categories
  const handleAddCategory = () => setOpenCategoryModal(true);
  const handleCloseCategoryForm = (data: any) => {
    if (data?.id) {
      setMessage(`The ${data.name} category has been created.`);
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
      <StyledPaper className={classes.styledPaper} elevation={1}>
        <HorizontalBox component="div" className={classes.horizontalBox}>
          <IconButton
            aria-label="add category"
            color="icon"
            onClick={handleAddCategory}
            sx={{ padding: 0 }}
          >
            <AddIcon color="inherit" />
          </IconButton>

          <Typography variant="body1" sx={{ padding: 0, paddingLeft: 1 }}>
            Add Category
          </Typography>

          <StyledButton
            onClick={() => setShowList(!showList)}
            className={classes.styledButton}
          >
            <Typography variant="body1" color={theme.palette.text.primary}>
              {listOfCategories.length}
            </Typography>
          </StyledButton>
        </HorizontalBox>
        <StyledCollapse in={showList} className={classes.styledCollapse}>
          <List>
            {listOfCategories.map((item) => {
              return (
                <ListItem key={item.id}>
                  <Link href={`/category/${item.id}`}>
                    <Typography color={theme.palette.text.primary}>
                      {item.name}
                    </Typography>
                  </Link>
                </ListItem>
              );
            })}
          </List>
        </StyledCollapse>
      </StyledPaper>

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
