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
  const { states } = useContext(StatesContext);
  const router = useRouter();

  //Protecting route
  useEffect(() => {
    if (!loggedIn) router.push("/");
  }, [loggedIn, router]);

  //Updating states
  // useEffect(() => {
  //   setStates({
  //     reports: reports || null,
  //     categories: categories || null,
  //     products: products || null,
  //   });
  // }, [reports, categories, products]);

  if (!states)
    return (
      <Fragment>
        <CssBaseline />
        <Container maxWidth="md" className={classes.root}>
          <Typography>Server Error</Typography>
        </Container>
      </Fragment>
    );
  const ComponentToDisplay: React.FC = () => {
    if (states?.report === 0) return <FirstReport />;
    else if (states?.category === 0) return <FirstCategory />;
    else if (states?.product === 0) return <FirstProduct />;
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
