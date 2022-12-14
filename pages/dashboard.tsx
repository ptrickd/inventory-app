//React
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";

//Components
import AddCategoryForm from "../components/AddCategoryForm";
import CreateNewReportModal from "../components/CreateNewReportModal";
import SubmittingReportModal from "../components/SubmittingReportModal";
import ErrorModal from "../components/ErrorModal";

//Material UI
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";

//Icons
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";

//Context
import { UserContext } from "../contexts/UserContext";

//Interface
interface IResponseStatus {
  succeeded: boolean;
  messageError: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      marginTop: 60,
      justifyContent: "center",
    },
    divider: {
      marginTop: 10,
    },
  })
);

function Dashboard() {
  const classes = useStyles();
  const router = useRouter();
  const { loggedIn, currentUser } = useContext(UserContext);
  const [openModal, setOpenModal] = useState(false);
  const [openCreateNewReport, setOpenCreateNewReport] = useState(false);
  const [openSubmittingModal, setOpenSubmittingModal] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);

  //Adding categories
  const handleAddCategory = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  //create template for new report
  const handleCloseCreateNewReport = (responseStatus: IResponseStatus) => {
    setOpenCreateNewReport(false);
    // console.log('responseStatusSucceed', responseStatusSucceed)
    if (!responseStatus.succeeded) setOpenErrorModal(true);
  };

  //Submitting report
  const handleSubmittingReport = () => setOpenSubmittingModal(true);
  const handleCloseSubmittingModal = () => {
    setOpenSubmittingModal(false);
    setOpenCreateNewReport(true);
  };

  //Display Error Message
  const handleCloseErrorModal = () => setOpenErrorModal(false);

  useEffect(() => {
    if (!loggedIn) {
      router.push("/");
    }
  }, [loggedIn, router]);

  return (
    <Container>
      <div className={classes.root}>
        <List>
          <Typography variant="h4">
            {currentUser && currentUser.email}
          </Typography>
          <Divider className={classes.divider} />
          <ListItem>
            <IconButton
              aria-label="add category"
              color="primary"
              onClick={handleAddCategory}
            >
              <AddIcon />
            </IconButton>
            <ListItemText primary="Add category" />
          </ListItem>

          <ListItem>
            <IconButton
              aria-label="create new report"
              color="primary"
              onClick={handleSubmittingReport}
            >
              <AddIcon />
            </IconButton>
            <ListItemText primary="Create Inventory Report" />
          </ListItem>
        </List>

        <AddCategoryForm open={openModal} handleCloseModal={handleCloseModal} />
        <CreateNewReportModal
          open={openCreateNewReport}
          handleCloseModal={handleCloseCreateNewReport}
        />
        <SubmittingReportModal
          open={openSubmittingModal}
          handleCloseModal={handleCloseSubmittingModal}
        />
        <ErrorModal
          open={openErrorModal}
          handleCloseModal={handleCloseErrorModal}
        />
      </div>
    </Container>
  );
}

export default Dashboard;
