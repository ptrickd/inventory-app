//React
import React, { useContext, Fragment } from "react";

//GraphQL
import { gql } from "@apollo/client";

//Material UI
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";

//Components
import FirstReport from "../components/firstReport";
import FirstCategory from "../components/firstCategory";
import FirstProduct from "../components/firstProduct";

//Context
import { UserContext } from "../contexts/UserContext";
import { ReportsContext } from "../contexts/ReportsContext";
import { CategoriesContext } from "../contexts/CategoriesContext";
import { ProductsContext } from "../contexts/ProductsContext";

//Queries
const GET_STATES = gql`
  query States {
    numOfReports
    numOfCategories
    numOfProducts
  }
// `;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: 20,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-around",
    },
  })
);

//Reformating three firstPages in one.
const Wiz: React.FC = () => {
  const classes = useStyles();
  const { loggedIn } = useContext(UserContext);
  const { numOfReports } = useContext(ReportsContext);
  const ComponentToDisplay: React.FC = () => <FirstReport />;

  return (
    <Fragment>
      <CssBaseline />
      <Container maxWidth="md" className={classes.root}>
        <ComponentToDisplay />
      </Container>
    </Fragment>
  );
};

export default Wiz;
