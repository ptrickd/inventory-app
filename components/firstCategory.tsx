//Component inviting the user o choose the date of the first report
//React
import React, { useState, Fragment } from "react";

import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

//Components
import AddCategoryForm from "./AddCategoryForm";
import DisplayMessage from "./DisplayMessage";

const PREFIX = "FirstCategory";

const classes = {
  button: `${PREFIX}-button`,
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled("div")(({ theme: Theme }) => ({
  [`& .${classes.button}`]: {
    width: "70%",
  },
}));

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
  const handleModal = (category?: ICategory) => {
    if (category) {
      if (category.error) {
        setMessageError(category.error);
      }
    }

    setOpenModal(false);
  };

  return (
    <Root>
      <Typography align="center" variant="body1" paragraph>
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
