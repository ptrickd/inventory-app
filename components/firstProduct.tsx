//Component inviting the user o choose the date of the first report
//React
import React, { useState, useEffect, Fragment } from "react";

//Material UI
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

//Components
import AddCategoryForm from "../components/AddCategoryForm";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      width: "70%",
    },
  })
);

const FirstProduct: React.FC = () => {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const textBody = `Next you have to create your first product in the category you just created. An example is Romaine in the Produce category. `;
  const handleModal = () => {
    setOpenModal(false);
  };

  //make it is own function or add to handleModal??
  const createdProduct = () => {};
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
    </Fragment>
  );
};

export default FirstProduct;
