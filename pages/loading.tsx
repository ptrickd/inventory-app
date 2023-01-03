//page handling the loading state and managing the navigation in some cases
//React
import React, { useEffect, useContext } from "react";

import { useRouter } from "next/router";

import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";

//Components
import WaitingModal from "../components/WaitingModal";

//Context
import { UserContext } from "../contexts/UserContext";
import { StatesContext } from "../contexts/StatesContext";
import { ReportsContext } from "../contexts/ReportsContext";
import { CategoriesContext } from "../contexts/CategoriesContext";
import { ProductsContext } from "../contexts/ProductsContext";

const PREFIX = "loading";

const classes = {
  root: `${PREFIX}-root`,
};

const StyledContainer = styled(Container)(({ theme: Theme }) => ({
  [`&.${classes.root}`]: {
    height: "100%",
    width: "100%",
    display: "flex",
  },
}));

export default function Loading() {
  const router = useRouter();
  const { loggedIn } = useContext(UserContext);
  const { loadingStates } = useContext(StatesContext);
  const { hasReport } = useContext(ReportsContext);
  const { hasCategory } = useContext(CategoriesContext);
  const { hasProduct } = useContext(ProductsContext);

  useEffect(() => {
    if (!loggedIn) {
      router.push("/");
    } else if (!loadingStates && (!hasReport || !hasCategory || !hasProduct)) {
      router.push("/wiz");
    } else if (!loadingStates) {
      router.push("/dashboard");
    }
  }, [loggedIn, router, hasReport, hasCategory, hasProduct, loadingStates]);

  if (loadingStates) return null;
  return (
    <StyledContainer className={classes.root} maxWidth="xs">
      <WaitingModal open={true} />
    </StyledContainer>
  );
}
