"use client";
//React
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";

//Components
import CreateNewReportModal from "../../components/CreateNewReportModal";
import SubmittingReportModal from "../../components/SubmittingReportModal";
import ErrorModal from "../../components/ErrorModal";
import SettingsModal from "../../components/SettingsModal";

import CategoriesSection from "../../components/CategoriesSection";

import ReportsSection from "../../components/ReportsSection";

//Material UI
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";

import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import Paper from "@mui/material/Paper";

//Icons
import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";

//Context
import { UserContext } from "../../contexts/UserContext";
import { CategoriesContext } from "../../contexts/CategoriesContext";
import { ReportsContext } from "../../contexts/ReportsContext";

//Style
import {
  rootStyle,
  mainStyle,
  paperStyle,
  dividerStyle,
} from "../../styles/dashboard.style";

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
  useEffect(() => {
    console.log("categoires");
    console.log(categories);
    console.log(`loggedIn: ${loggedIn}`);

    console.log("reports->");
    console.log(reports);
  }, [categories, loggedIn, reports]);
  return (
    <Container className={rootStyle} maxWidth="xs">
      <Box className={mainStyle}>
        <Paper className={paperStyle} elevation={1}>
          <Typography variant="h4" align="center">
            {currentUser && currentUser.email}
          </Typography>
          <Divider sx={{ marginTop: 2 }} className={dividerStyle} />
          <CategoriesSection listOfCategories={categories || []} />
          <Divider sx={{ marginTop: 2 }} className={dividerStyle} />
          <ReportsSection
            list={reports || []}
            handleClickAddModal={() => setOpenCreateNewReport(true)}
          />
          <Divider sx={{ marginTop: 2 }} className={dividerStyle} />

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
        </Paper>
      </Box>
    </Container>
  );
}

export default Dashboard;
