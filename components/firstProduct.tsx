//Component inviting the user o choose the date of the first report
//React
import React, { useState, useEffect, useContext, Fragment } from "react";

//Material UI
import makeStyles from "@mui/styles/makeStyles";
import { Theme, createStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

//Contexts
import { CategoriesContext } from "../contexts/CategoriesContext";
import { ProductsContext } from "../contexts/ProductsContext";

//Components
import AddProductForm from "../components/AddProductForm";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      width: "70%",
    },
  })
);

const FirstProduct: React.FC = () => {
  const classes = useStyles();
  const { categories } = useContext(CategoriesContext);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const textBody = `Next you have to create your first product in the category you just created. An example is Romaine in the Produce category. `;
  const handleModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    if (categories && setCategoryId) {
      console.log(categories[0].name);
      setCategoryId(categories[0].id);
    }
  }, [categories, setCategoryId]);
  if (categories === undefined) return null;
  return (
    <Fragment>
      <Typography align="center" variant="body1" paragraph>
        {textBody}
      </Typography>
      <Typography>
        Your first category is
        <Box component="span">{"categories[0].name"}</Box> &&
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
      {typeof categoryId === "string" && (
        <AddProductForm
          open={openModal}
          handleCloseModal={handleModal}
          categoryId={categoryId}
        />
      )}
    </Fragment>
  );
};

export default FirstProduct;
