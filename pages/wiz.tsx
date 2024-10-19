//React
import React, { useEffect, useContext } from "react";
import { useRouter } from "next/router";

//Material UI
import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

//Components
import FirstReport from "../components/FirstReport";
import FirstCategory from "../components/FirstCategory";
import FirstProduct from "../components/FirstProduct";
import Footer from "../Layout/Footer";

//Context
import { UserContext } from "../contexts/UserContext";
import { ReportsContext } from "../contexts/ReportsContext";
import { CategoriesContext } from "../contexts/CategoriesContext";
import { ProductsContext } from "../contexts/ProductsContext";

//Function
import { redirectOnLogin } from "../utils/redirect";

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

//Reformating three firstPages in one.
const Wiz: React.FC = () => {
  const { loggedIn } = useContext(UserContext);
  const { hasReport } = useContext(ReportsContext);
  const { hasCategory } = useContext(CategoriesContext);
  const { hasProduct } = useContext(ProductsContext);

  const router = useRouter();

  //Protecting route
  useEffect(() => {
    if (
      hasReport !== undefined &&
      hasReport !== null &&
      hasCategory !== undefined &&
      hasCategory !== null &&
      hasProduct !== undefined &&
      hasProduct !== null
    ) {
      if (!loggedIn) router.push("/");
      if (loggedIn) {
        //Memoized function
        const url = redirectOnLogin(hasReport, hasCategory, hasProduct);
        if (url && url.pathname !== "" && url.query?.l !== router?.query?.l)
          router.push(url);
      }
    }
  }, [loggedIn, router, hasReport, hasCategory, hasProduct]);

  //have to add parameters to handle a response from any 3 components
  // const handleResponse = (isResponseSucceed: IResponseStatus) => {};

  //Protecting route
  if (!loggedIn) return null;
  return (
    <Root maxWidth="md" className={classes.root}>
      <Main className={classes.main}>
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
