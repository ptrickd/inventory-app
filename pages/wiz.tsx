//React
import React, { useState, useEffect, useContext, Fragment } from "react";
import { useRouter } from "next/router";

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
import { StatesContext } from "../contexts/StatesContext";

//Define types
interface IFuncProps {
  currentState: string;
}
interface IResponseStatus {
  succeeded: boolean;
  messageError: string;
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

  const { loggedIn } = useContext(UserContext);
  const { hasReport, hasCategory, hasProduct } = useContext(StatesContext);
  const router = useRouter();

  //Protecting route
  useEffect(() => {
    if (!loggedIn) router.push("/");
  }, [loggedIn, router]);

  //have to add parameters to handle a response from any 3 components
  // const handleResponse = (isResponseSucceed: IResponseStatus) => {};

  if (
    hasReport === undefined ||
    hasCategory === undefined ||
    hasProduct === undefined
  )
    return (
      <Fragment>
        <Typography>Page Error</Typography>
      </Fragment>
    );
  return (
    <Fragment>
      <CssBaseline />
      <Container maxWidth="md" className={classes.root}>
        {/* <ComponentToDisplay currentState={states.state} /> */}

        {!hasReport && <FirstReport />}
        {hasReport && !hasCategory && <FirstCategory />}
        {hasReport && hasCategory && !hasProduct && <FirstProduct />}
      </Container>
    </Fragment>
  );
};

export default Wiz;
