"use client";
//React
import React, { useState } from "react";
import Link from "next/link";

//Components
import AddCategoryForm from "../../components/AddCategoryForm";
import MessageModal from "../MessageModal";
import ListItem from "@mui/material/ListItem";

//Material UI

import { css } from "@pigment-css/react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";

import List from "@mui/material/List";

//Material Icon
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";

//Styles
import {
  sectionStyle,
  buttonStyle,
  horizontalBoxStyle,
  collapseStyle,
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

  //Style
  const textStyle = css`
    color: ${({ theme }) => theme.colorSchemes.dark.palette.primary};

    @media (prefers-color-scheme: light) {
      color: ${({ theme }) => theme.colorSchemes.light.palette.primary};
    }
  `;
  const iconStyle = css(({ theme }) => ({
    color: theme.colorSchemes.dark.palette.icon.main,
    "@media (prefers-color-scheme: light)": {
      color: theme.colorSchemes.light.palette.icon.main,
    },
  }));

  return (
    <Box component="section" className={sectionStyle}>
      <Box className={horizontalBoxStyle}>
        <IconButton
          aria-label="add category"
          color="icon"
          onClick={handleAddCategory}
          sx={{ padding: 0 }}
        >
          <AddIcon className={iconStyle} />
        </IconButton>

        <Typography variant="body1" sx={{ padding: 0, paddingLeft: 1 }}>
          Add Category
        </Typography>

        <Button onClick={() => setShowList(!showList)} className={buttonStyle}>
          <Typography variant="body1" className={textStyle}>
            {listOfCategories.length}
          </Typography>
        </Button>
      </Box>
      <Collapse in={showList} className={collapseStyle}>
        <List>
          {listOfCategories.map((item) => {
            return (
              <ListItem key={item.id}>
                <Link href={`/category/${item.id}`}>
                  <Typography className={textStyle}>{item.name}</Typography>
                </Link>
              </ListItem>
            );
          })}
        </List>
      </Collapse>

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
    </Box>
  );
};

export default CategoriesSection;
