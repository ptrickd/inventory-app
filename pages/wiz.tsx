//React
import React, { useState, useEffect, useContext, Fragment } from "react";
import { useRouter } from "next/router";

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

  const router = useRouter();

  //Protecting route
  useEffect(() => {
    if (!loggedIn) router.push("/");
  }, [loggedIn, router]);

  //have to add parameters to handle a response from any 3 components
  // const handleResponse = (isResponseSucceed: IResponseStatus) => {};

  return (
    <Root maxWidth="md" className={classes.root}>
      <Main component="div" className={classes.main}>
        {/* <ComponentToDisplay currentState={states.state} /> */}

        {router.query.l === "firstReport" && <FirstReport />}
        {router.query.l === "firstCategory" && <FirstCategory />}
        {router.query.l === "firstProduct" && <FirstProduct />}
      </Main>
      <Footer />
    </Root>
  );
};

export default Wiz;
