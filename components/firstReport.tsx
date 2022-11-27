//Component inviting the user o choose the date of the first report
//React
import React, { useState, useEffect, Fragment } from "react";

//Material UI
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

//Components
import CreateNewReportModal from "../components/CreateNewReportModal";

interface IProps {
  handleResponse: (responseSucceed: boolean) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      width: "70%",
    },
  })
);

const FirstReport: React.FC<IProps> = ({ handleResponse }) => {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const textBody = `Your first step to start your inventory is to choose the 
  date of your first report.`;

  const handleModalClicked = (responseSucceed: boolean) => {
    setOpenModal(false);
    //getting the response from the server if succesful or not then send it to the parent
    handleResponse(responseSucceed);
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
    </Fragment>
  );
};

export default FirstReport;
