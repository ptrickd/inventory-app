//React
import React, { useState, useEffect, useContext, Fragment } from "react";

//GraphQL
import { gql } from "@apollo/client";

//Material UI
import { makeStyles, Theme, createStyles, Typography } from "@material-ui/core";
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
import { useRouter } from "next/router";

//Define types
interface IStates {
  reports: any[] | null;
  categories: any[] | null;
  products: any[] | null;
}

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
  const [states, setStates] = useState<IStates>({
    reports: null,
    categories: null,
    products: null,
  });
  const { loggedIn } = useContext(UserContext);
  const { reports } = useContext(ReportsContext);
  const { categories } = useContext(CategoriesContext);
  const { products } = useContext(ProductsContext);
  const router = useRouter();

  //Protecting route
  useEffect(() => {
    if (!loggedIn) router.push("/");
  }, []);

  //Updating states
  useEffect(() => {
    setStates({
      reports: reports || null,
      categories: categories || null,
      products: products || null,
    });
  }, [reports, categories, products]);

  if (!states.reports || !states.categories || !states.products)
    return (
      <Fragment>
        <CssBaseline />
        <Container maxWidth="md" className={classes.root}>
          <Typography>Server Error</Typography>
        </Container>
      </Fragment>
    );
  const ComponentToDisplay: React.FC = () => {
    if (states?.reports?.length === 0) return <FirstReport />;
    else if (states?.categories?.length === 0) return <FirstCategory />;
    else if (states?.products?.length === 0) return <FirstProduct />;
    else {
      return (
        <Fragment>
          <Typography>Page Error</Typography>
        </Fragment>
      );
    }
  };

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
