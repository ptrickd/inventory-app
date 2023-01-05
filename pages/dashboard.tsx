//React
import React, { useState, useEffect, useContext } from "react";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";

//Components
import AddCategoryForm from "../components/AddCategoryForm";
import CreateNewReportModal from "../components/CreateNewReportModal";
import SubmittingReportModal from "../components/SubmittingReportModal";
import ErrorModal from "../components/ErrorModal";
import SettingsModal from "../components/SettingsModal";
import Footer from "../Layout/Footer";

//Material UI
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";

//Icons
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import SettingsIcon from "@mui/icons-material/Settings";

//Context
import { UserContext } from "../contexts/UserContext";

const PREFIX = "Dashboard";

const classes = {
  root: `${PREFIX}-root`,
  divider: `${PREFIX}-divider`,
};

const StyledContainer = styled(Container)(({ theme: Theme }) => ({
  [`& .${classes.root}`]: {
    display: "flex",
    marginTop: 60,
    justifyContent: "center",
  },

  [`& .${classes.divider}`]: {
    marginTop: 10,
  },
}));

//Interface
interface IResponseStatus {
  succeeded: boolean;
  messageError: string;
}

function Dashboard() {
  const router = useRouter();
  const { loggedIn, currentUser } = useContext(UserContext);
  const [openModal, setOpenModal] = useState(false);
  const [openCreateNewReport, setOpenCreateNewReport] = useState(false);
  const [openSubmittingModal, setOpenSubmittingModal] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [openSettingsModal, setOpenSettingsModal] = useState(false);

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

  //Settings Modal
  const handleCloseSettingsModal = () => setOpenSettingsModal(false);
  const handleOpenSettingsModal = () => setOpenSettingsModal(true);
  useEffect(() => {
    if (!loggedIn) {
      router.push("/");
    }
  }, [loggedIn, router]);

  return (
    <StyledContainer>
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
          <ListItem>
            <IconButton
              aria-label="settings"
              color="primary"
              onClick={handleOpenSettingsModal}
            >
              <SettingsIcon />
            </IconButton>
            <ListItemText primary="Settings" />
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
        <SettingsModal
          open={openSettingsModal}
          handleArrowClicked={handleCloseSettingsModal}
        />
        <Footer />
      </div>
    </StyledContainer>
  );
}

export default Dashboard;
