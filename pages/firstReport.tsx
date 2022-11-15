//Component inviting the user o choose the date of the first report
//React
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";

//Material UI
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

//Components
import CreateNewReportModal from "../components/CreateNewReportModal";

//Context
import { UserContext } from "../contexts/UserContext";
import { StatesContext } from "../contexts/StatesContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: 20,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-around",
    },
    button: {
      width: "70%",
    },
  })
);

const FirstReport: React.FC = () => {
  const classes = useStyles();
  const router = useRouter();
  const { loggedIn } = useContext(UserContext);
  const { reloadStates } = useContext(StatesContext);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const textBody = `Your first step to start your inventory is to choose the 
  date of your first report.`;
  useEffect(() => {
    if (!loggedIn) router.push("/");
  }, [loggedIn]);

  const handleModalClicked = (data: any) => {
    //To add: getting the response from the server if succesful or not
    setOpenModal(false);
    if (reloadStates) reloadStates();
    router.push("/loading");
  };
  return (
    <Container maxWidth="md" className={classes.root}>
      <Typography align="center" variant="h3">
        Welcome to Gruyere
      </Typography>
      <Typography align="center" variant="body1" paragraph>
        {textBody}
      </Typography>
      <Button
        onClick={() => setOpenModal(true)}
        className={classes.button}
        variant="contained"
        color="primary"
        size="large"
      >
        Do it
      </Button>
      <CreateNewReportModal
        open={openModal}
        handleCloseModal={handleModalClicked}
      />
    </Container>
  );
};

export default FirstReport;
