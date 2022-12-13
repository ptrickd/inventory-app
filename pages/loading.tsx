//page handling the loading state and managing the navigation in some cases
//React
import React, { useEffect, useContext } from "react";
import { useRouter } from "next/router";

//Material UI
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

//Components
import WaitingModal from "../components/WaitingModal";

//Context
import { UserContext } from "../contexts/UserContext";
import { StatesContext } from "../contexts/StatesContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100%",
      width: "100%",
      display: "flex",
    },
  })
);

export default function Loading() {
  const classes = useStyles();
  const router = useRouter();
  const { loggedIn } = useContext(UserContext);
  const { hasReport, hasCategory, hasProduct } = useContext(StatesContext);

  useEffect(() => {
    if (!loggedIn) {
      router.push("/");
    } else if (!hasReport || !hasCategory || !hasProduct) {
      router.push("/wiz");
    }
  }, [loggedIn, router, hasReport, hasCategory, hasProduct]);

  return (
    <Container className={classes.root} maxWidth="xs">
      <WaitingModal open={true} />
    </Container>
  );
}
