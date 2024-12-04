//React
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";

//Components
import CreateNewReportModal from "../components/CreateNewReportModal";
import SubmittingReportModal from "../components/SubmittingReportModal";
import ErrorModal from "../components/ErrorModal";
import SettingsModal from "../components/SettingsModal";
import Footer from "../Layout/Footer";
import CategoriesSection from "../components/CategoriesSection";
import ReportsSection from "../components/ReportsSection";

//Material UI
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";

//Icons
import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";

//Context
import { UserContext } from "../contexts/UserContext";
import { CategoriesContext } from "../contexts/CategoriesContext";
import { ReportsContext } from "../contexts/ReportsContext";

//Style
import {
  Root,
  Main,
  StyledPaper,
  StyledDivider,
} from "../styles/dashboard.style";

//Interface
interface IResponseStatus {
  succeeded: boolean;
  messageError: string;
}

function Dashboard() {
  const router = useRouter();

  //Context
  const { loggedIn, currentUser } = useContext(UserContext);
  const { categories } = useContext(CategoriesContext);
  const { reports } = useContext(ReportsContext);

  //UseState
  const [openCreateNewReport, setOpenCreateNewReport] = useState(false);
  const [openSubmittingModal, setOpenSubmittingModal] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [openSettingsModal, setOpenSettingsModal] = useState(false);

  //create template for new report
  const handleCloseCreateNewReport = (responseStatus: IResponseStatus) => {
    setOpenCreateNewReport(false);

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
    <Container className={classes.root} maxWidth="xs">
      <Box className={classes.main}>
        <StyledPaper className={classes.styledPaper} elevation={1}>
          <Typography variant="h4" align="center">
            {currentUser && currentUser.email}
          </Typography>
          <StyledDivider sx={{ marginTop: 2 }} className={classes.divider} />
          <CategoriesSection listOfCategories={categories || []} />
          <StyledDivider sx={{ marginTop: 2 }} className={classes.divider} />
          <ReportsSection
            list={reports || []}
            handleClickAddModal={() => setOpenCreateNewReport(true)}
          />
          <StyledDivider sx={{ marginTop: 2 }} className={classes.divider} />
          <List>
            <ListItem>
              <IconButton
                aria-label="settings"
                color="icon"
                onClick={handleOpenSettingsModal}
              >
                <SettingsIcon color="inherit" />
              </IconButton>
              <ListItemText primary="Settings" />
            </ListItem>
          </List>

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
            handleCloseModal={handleCloseSettingsModal}
          />
        </StyledPaper>
      </Box>
      <Footer />
    </Container>
  );
}

export default Dashboard;
