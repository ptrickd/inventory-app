//Component inviting the user o choose the date of the first report
//React
import React, { useState, useEffect, useContext } from "react";

import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

//Contexts
import { CategoriesContext } from "../contexts/CategoriesContext";
import { ProductsContext } from "../contexts/ProductsContext";

//Components
import AddProductForm from "../components/AddProductForm";
import DisplayMessage from "./DisplayMessage";

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
  const [messageError, setMessageError] = useState("");
  const textBody = `Next you have to create your first product in the category you just created. An example is Romaine in the Produce category. `;

  useEffect(() => {
    return () => {
      setOpenModal(false);
    };
  }, []);

  const handleModal = (response: string) => {
    if (Boolean(response.length)) setMessageError(response);
    setOpenModal(false);
  };

  useEffect(() => {
    if (categories && setCategoryId && categories[0]) {
      console.log(categories[0].name);
      setCategoryId(categories[0].id);
    }
  }, [categories, setCategoryId]);
  //To fix: when no categories do something
  if (categories === undefined || categories[0] === undefined) return null;
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
        <DisplayMessage
          show={Boolean(messageError.length > 0)}
          message={messageError}
        />
      </div>
    </Root>
  );
};

export default FirstProduct;
