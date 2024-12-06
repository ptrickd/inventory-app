//Component inviting the user o choose the date of the first report
//React
import React, { useState, useEffect } from "react";

//Material UI
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

//Components
import CreateNewReportModal from "../../components/CreateNewReportModal";
import DisplayMessage from "../DisplayMessage";

//Types
import { buttonStyle, itemsStyle, rootStyle } from "./FirstReport.style";

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
    <section className={rootStyle}>
      <Typography align="center" variant="h3" className={itemsStyle}>
        Welcome to Gruyere
      </Typography>
      <Typography
        align="center"
        variant="body1"
        paragraph
        className={itemsStyle}
      >
        {textBody}
      </Typography>
      <Button
        onClick={() => setOpenModal(true)}
        className={buttonStyle}
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
    </section>
  );
};

export default FirstReport;
