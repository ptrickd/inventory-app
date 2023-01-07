//React
import React from "react";

//Material UI
import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
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
const StyledContainer = styled(Container)(({ theme: Theme }) => ({
  [`&.${classes.root}`]: {
    marginTop: "auto",
  },
  [`&.${classes.contact}`]: {
    display: "flex",
    flexDirection: "row",
  },
}));

const Footer = () => {
  return (
    <StyledContainer className={classes.root}>
      <Divider />
      <Box component="div" className={classes.contact}>
        <Typography variant="body1" align="inherit">
          Contact
        </Typography>
        <Box component="div">
          <Tooltip title="Github">
            <IconButton
              href="https://github.com/ptrickd/inventory-app"
              aria-label="github"
            >
              <GitHubIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
        <Box component="div">
          <Tooltip title="Email">
            <IconButton href="mailto:test@example.com" aria-label="email">
              <EmailIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <Divider />
    </StyledContainer>
  );
};

export default Footer;
