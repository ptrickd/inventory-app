//Material UI
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";

const PREFIX = "SubmittingReportModal";

export const classes = {
  text: `${PREFIX}-text`,
  actions: `${PREFIX}-actions`,
};

export const StyledDialog = styled(Dialog)(({ theme: Theme }) => ({
  [`& .${classes.text}`]: {
    marginTop: 10,
    marginLeft: 10,
    marginRigth: 10,
  },

  [`& .${classes.actions}`]: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));
