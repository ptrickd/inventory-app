//page handling the loading state and managing the navigation in some cases
//React
import React, { useEffect, useContext } from "react";
import { useRouter } from "next/router";

//Context
// import { StatesContext } from "../contexts/StatesContext";

//Material UI
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

//GraphQL

//Components
import WaitingModal from "../components/WaitingModal";
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
  const { states } = useContext(StatesContext);

  useEffect(() => {
    if (states?.state !== "loading") {
      if (states?.report === 0) {
        router.push("/firstReport");
      }
    }
    if (!states) {
      console.log("no data from the StatesContext ");
    }
  }, [states]);

  return (
    <Container className={classes.root} maxWidth="xs">
      <WaitingModal open={true} />
    </Container>
  );
}
