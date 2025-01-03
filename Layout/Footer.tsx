//React
import React from "react";

//Material UI
import { css } from "@pigment-css/react";
import Container from "@mui/material-pigment-css/Container";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material-pigment-css/Box";
import Typography from "@mui/material/Typography";

// Material Icons
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";

const PREFIX = "Footer";

const classes = {
  root: `${PREFIX}-root`,
  contact: `${PREFIX}-contact`,
};

//Add position:relative to all parent container
const rootStyle = css({ marginTop: "auto" });
const contactStyle = css({ display: "flex", flexDirection: "row" });

const Footer = () => {
  return (
    <Container className={rootStyle}>
      <Divider />
      <Box component="div" className={contactStyle}>
        <Typography variant="body1" align="inherit">
          Contact
        </Typography>
        <Box component="div">
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
        <Box component="div">
          <Tooltip title="Email">
            <IconButton
              color="icon"
              href="mailto:test@example.com"
              aria-label="email"
            >
              <EmailIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <Divider />
    </Container>
  );
};

export default Footer;
