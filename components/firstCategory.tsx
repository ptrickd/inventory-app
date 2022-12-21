//Component inviting the user o choose the date of the first report
//React
import React, { useState, Fragment } from "react";

//Material UI
import { makeStyles, Theme, createStyles } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

//Components
import AddCategoryForm from "./AddCategoryForm";
import DisplayMessage from "./DisplayMessage";

//Interfaces
interface ICategory {
  id: string;
  name: string;
  error: string;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      width: "70%",
    },
  })
);

const FirstCategory: React.FC = () => {
  const classes = useStyles();
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
    <Fragment>
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
    </Fragment>
  );
};

export default FirstCategory;
