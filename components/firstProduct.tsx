//Component inviting the user o choose the date of the first report
//React
import React, { useState, useEffect, useContext, Fragment } from "react";

import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

//Contexts
import { CategoriesContext } from "../contexts/CategoriesContext";
import { ProductsContext } from "../contexts/ProductsContext";

//Components
import AddProductForm from "../components/AddProductForm";

const PREFIX = "FirstProduct";

const classes = {
  button: `${PREFIX}-button`,
  root: `${PREFIX}-root`,
  items: `${PREFIX}-items`,
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled("div")(({ theme: Theme }) => ({
  [`& .${classes.button}`]: {
    width: "70%",
  },
  [`& .${classes.items}`]: { flexGrow: 2 },
  [`& .${classes.root}`]: {
    display: "flex",
    minHeight: "70vh",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "10%",
  },
}));

const FirstProduct: React.FC = () => {
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
    <Root>
      <div className={classes.root}>
        <Typography
          align="center"
          variant="body1"
          paragraph
          className={classes.items}
        >
          {textBody}
        </Typography>
        <Typography className={classes.items}>
          Your first category is
          <Box component="span"> {categories[0].name}</Box>
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
      </div>
    </Root>
  );
};

export default FirstProduct;
