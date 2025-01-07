//React
import React from "react";

//Material UI
import { css } from "@pigment-css/react";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material-pigment-css/Box";
import Typography from "@mui/material/Typography";

// Material Icons
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";

//Add position:relative to all parent container
const rootStyle = css({ marginTop: "auto" });
const contactStyle = css({
  minWidth: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "center",
});
const itemsStyle = css({ margin: 0, padding: 0 });
const Footer = () => {
  return (
    <Container className={rootStyle}>
      <Divider />
      <Box component="section" className={contactStyle}>
        <Box component="section">
          <Typography align="center" variant="body1">
            2025
          </Typography>
        </Box>
        <Box component="section">
          <Typography align="center" variant="body1">
            ptrickd
          </Typography>
        </Box>
        <Box component="section">
          <Tooltip title="Github">
            <IconButton
              href="https://github.com/ptrickd/inventory-app"
              aria-label="github"
              color="icon"
            >
              <GitHubIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <Divider />
    </Container>
  );
};

export default Footer;
