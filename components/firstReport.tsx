//Component inviting the user o choose the date of the first report
//React
import React, { useState, useEffect } from "react";

import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

//Components
import CreateNewReportModal from "../components/CreateNewReportModal";
import DisplayMessage from "./DisplayMessage";

const PREFIX = "FirstReport";

const classes = {
  button: `${PREFIX}-button`,
  root: `${PREFIX}-root`,
  items: `${PREFIX}-items`,
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled("div")(({ theme: Theme }) => ({
  [`& .${classes.button}`]: {
    width: "70%",
  },
  [`& .${classes.items}`]: { flexGrow: 2 },
  [`& .${classes.root}`]: {
    display: "flex",
    minHeight: "70vh",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "10%",
  },
}));

interface IResponseStatus {
  succeeded: boolean;
  messageError: string;
}

const FirstReport: React.FC = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [messageError, setMessageError] = useState("");
  const textBody = `Your first step to start your inventory is to choose the 
  date of your first report.`;

  useEffect(() => {
    return () => {
      setOpenModal(false);
    };
  }, []);

  const handleModalClicked = (responseStatus: IResponseStatus) => {
    setOpenModal(false);
    //getting the response from the server if succesful update reportContext
    // or not then display error message
    if (!responseStatus.succeeded) {
      setMessageError(responseStatus.messageError);
    }
  };
  return (
    <Root>
      <div className={classes.root}>
        <Typography align="center" variant="h3" className={classes.items}>
          Welcome to Gruyere
        </Typography>
        <Typography
          align="center"
          variant="body1"
          paragraph
          className={classes.items}
        >
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
        <DisplayMessage show={messageError.length > 0} message={messageError} />
      </div>
    </Root>
  );
};

export default FirstReport;
