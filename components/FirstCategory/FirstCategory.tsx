//Component inviting the user o choose the date of the first report
//React
import React, { useState, useEffect } from "react";

//Material UI
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

//Components
import AddCategoryForm from "../AddCategoryForm";
import DisplayMessage from "../DisplayMessage";

//Types
import { classes, Root } from "./FirstCategory.styles";

//Interfaces
interface ICategory {
  id: string;
  name: string;
  error: string;
}

const FirstCategory: React.FC = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [messageError, setMessageError] = useState("");
  const textBody = `Next you have to create your first category. Example are "Cooler" or "Dry Storage". `;

  useEffect(() => {
    return () => {
      setOpenModal(false);
    };
  }, []);

  const handleModal = (category?: ICategory) => {
    if (category) {
      setOpenModal(false);
      if (category.error) {
        setMessageError(category.error);
      }
    }
  };

  return (
    <Root className={classes.root}>
      <Typography
        align="center"
        variant="body1"
        paragraph
        className={classes.items}
      >
        {textBody}
      </Typography>
      <Button
        onClick={() => setOpenModal(true)}
        className={classes.button}
        variant="contained"
        color="primary"
        size="large"
      >
        Do it
      </Button>
      <AddCategoryForm open={openModal} handleCloseModal={handleModal} />
      <DisplayMessage show={messageError.length > 0} message={messageError} />
    </Root>
  );
};

export default FirstCategory;
