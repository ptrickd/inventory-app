//React
import React from "react";

//Material UI
import { css } from "@pigment-css/react";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// Material Icons
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";

//Add position:relative to all parent container
const rootStyle = css({
  width: "100%",
});
const contactStyle = css({
  minWidth: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "center",
});
const iconStyle = css(({ theme }) => ({
  color: theme.colorSchemes.dark.palette.text.primary,
  "@media (prefers-color-scheme: light)": {
    color: theme.colorSchemes.light.palette.text.primary,
  },
}));
const itemsStyle = css({ margin: 0, padding: 0 });
const Footer = () => {
  return (
    <Container className={rootStyle} maxWidth="md">
      <Divider />
      <Box component="section" className={contactStyle}>
        <article>
          <Typography align="center" variant="body1">
            2025
          </Typography>
        </article>
        <article>
          <Typography align="center" variant="body1">
            ptrickd
          </Typography>
        </article>
        <article>
          <Tooltip title="Github">
            <IconButton
              href="https://github.com/ptrickd/inventory-app"
              aria-label="github"
              color="icon"
            >
              <GitHubIcon fontSize="small" className={iconStyle} />
            </IconButton>
          </Tooltip>
        </article>
      </Box>
      <Divider />
    </Container>
  );
};

export default Footer;
