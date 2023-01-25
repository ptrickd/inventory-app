//React
import React, { useState, useEffect, useContext, Fragment } from "react";
import { useRouter } from "next/router";

//GraphQL
import { gql } from "@apollo/client";

//Material UI
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

//Components
import FirstReport from "../components/firstReport";
import FirstCategory from "../components/firstCategory";
import FirstProduct from "../components/firstProduct";
import Footer from "../Layout/Footer";

//Context
import { UserContext } from "../contexts/UserContext";
import { ReportsContext } from "../contexts/ReportsContext";
import { CategoriesContext } from "../contexts/CategoriesContext";
import { ProductsContext } from "../contexts/ProductsContext";

const PREFIX = "Wiz";

const classes = {
  root: `${PREFIX}-root`,
  main: `${PREFIX}-main`,
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled(Container)(({ theme: Theme }) => ({
  [`&.${classes.root}`]: {
    padding: 20,
    display: "flex",
    minHeight: "calc(100vh - 120px)",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
  },
}));

const Main = styled(Box)(() => ({
  [`&.${classes.main}`]: {
    display: "flex",
    flexDirection: "column",
    marginTop: "15%",
    marginBottom: "10%",
    width: "100%",
    minHeight: "70vh",
    alignContent: "space-between",
  },
}));

//Define types
interface IResponseStatus {
  succeeded: boolean;
  messageError: string;
}

//Reformating three firstPages in one.
const Wiz: React.FC = () => {
  const { loggedIn } = useContext(UserContext);
  const { hasReport } = useContext(ReportsContext);
  const { hasCategory } = useContext(CategoriesContext);
  const { hasProduct } = useContext(ProductsContext);

  const router = useRouter();

  //Protecting route
  useEffect(() => {
    if (!loggedIn) router.push("/");
  }, [loggedIn, router]);

  useEffect(() => {
    if (hasProduct) router.push("/dashboard");
  }, [hasProduct, router]);

  //have to add parameters to handle a response from any 3 components
  // const handleResponse = (isResponseSucceed: IResponseStatus) => {};

  if (
    hasReport === undefined ||
    hasCategory === undefined ||
    hasProduct === undefined
  )
    return (
      <Root>
        <Typography>Page Error</Typography>
      </Root>
    );

  return (
    <Root maxWidth="md" className={classes.root}>
      <Main component="div" className={classes.main}>
        {/* <ComponentToDisplay currentState={states.state} /> */}

        {!hasReport && <FirstReport />}
        {hasReport && !hasCategory && <FirstCategory />}
        {hasReport && hasCategory && !hasProduct && <FirstProduct />}
      </Main>
      <Footer />
    </Root>
  );
};

export default Wiz;
