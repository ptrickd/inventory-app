//Material UI
import { styled } from "@mui/material-pigment-css";
import Container from "@mui/material-pigment-css/Container";

const PREFIX = "ProductsPage";

export const classes = {
  root: `${PREFIX}-root`,
  button: `${PREFIX}-button`,
  title: `${PREFIX}-title`,
  titleText: `${PREFIX}-title-text`,
  productContainer: `${PREFIX}-product-container`,
};

export const Root = styled(Container)(() => ({
  [`&.${classes.root}`]: {
    marginTop: 60,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  [`& .${classes.button}`]: {
    marginTop: "10px",
  },

  [`& .${classes.title}`]: {
    marginTop: 12,
    display: "flex",
  },

  [`& .${classes.titleText}`]: {
    marginRight: 10,
  },

  [`& .${classes.productContainer}`]: {
    flexGrow: 1,
  },
}));
