//React
import React, { useState, useEffect, useContext, Fragment } from "react";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";

//GraphQL
import { gql } from "@apollo/client";

import { Theme, createStyles, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";

//Components
import FirstReport from "../components/firstReport";
import FirstCategory from "../components/firstCategory";
import FirstProduct from "../components/firstProduct";

//Context
import { UserContext } from "../contexts/UserContext";
import { StatesContext } from "../contexts/StatesContext";
import { ReportsContext } from "../contexts/ReportsContext";
import { CategoriesContext } from "../contexts/CategoriesContext";
import { ProductsContext } from "../contexts/ProductsContext";

const PREFIX = "Wiz";

const classes = {
  root: `${PREFIX}-root`,
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled("div")(({ theme: Theme }) => ({
  [`& .${classes.root}`]: {
    padding: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
  },
}));

//Define types
interface IFuncProps {
  currentState: string;
}
interface IResponseStatus {
  succeeded: boolean;
  messageError: string;
}

//Reformating three firstPages in one.
const Wiz: React.FC = () => {
  const { loggedIn } = useContext(UserContext);
  const { loadingStates } = useContext(StatesContext);
  const { hasReport } = useContext(ReportsContext);
  const { hasCategory } = useContext(CategoriesContext);
  const { hasProduct } = useContext(ProductsContext);

  const router = useRouter();

  //Protecting route
  useEffect(() => {
    if (!loggedIn) router.push("/");
  }, [loggedIn, router]);
  useEffect(() => {
    console.log(`hasReport ${hasReport}`);
    console.log(`hasCategory ${hasCategory}`);
    console.log(`hasProduct ${hasProduct}`);
  }, [hasReport, hasCategory, hasProduct]);
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
  if (loadingStates) return null;
  return (
    <Root>
      <CssBaseline />
      <Container maxWidth="md" className={classes.root}>
        {/* <ComponentToDisplay currentState={states.state} /> */}

        {!hasReport && <FirstReport />}
        {hasReport && !hasCategory && <FirstCategory />}
        {hasReport && hasCategory && !hasProduct && <FirstProduct />}
      </Container>
    </Root>
  );
};

export default Wiz;
