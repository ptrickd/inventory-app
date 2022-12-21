//Component inviting the user o choose the date of the first report
//React
import React, { useState, useContext, Fragment } from "react";

//Material UI
import makeStyles from "@mui/styles/makeStyles";
import { Theme, createStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

//Contexts
import { StatesContext } from "../contexts/StatesContext";

//Components
import CreateNewReportModal from "../components/CreateNewReportModal";
import DisplayMessage from "./DisplayMessage";

interface IResponseStatus {
  succeeded: boolean;
  messageError: string;
}
interface IProps {
  handleResponse: (responseSucceed: IResponseStatus) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      width: "70%",
    },
  })
);

const FirstReport: React.FC = () => {
  const classes = useStyles();
  const { setHasReport } = useContext(StatesContext);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [messageError, setMessageError] = useState("");
  const textBody = `Your first step to start your inventory is to choose the 
  date of your first report.`;

  const handleModalClicked = (responseStatus: IResponseStatus) => {
    setOpenModal(false);
    //getting the response from the server if succesful update reportContext
    // or not then display error message
    if (responseStatus.succeeded) {
      if (setHasReport) setHasReport(true);
    } else {
      setMessageError(responseStatus.messageError);
    }
  };
  return (
    <Fragment>
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
      <DisplayMessage show={messageError.length > 0} message={messageError} />
    </Fragment>
  );
};

export default FirstReport;
