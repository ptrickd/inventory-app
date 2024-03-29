//Material Ui
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";

const PREFIX = "CreateNewReportModal";

export const classes = {
  root: `${PREFIX}-root`,
  button: `${PREFIX}-button`,
};

export const StyledDialog = styled(Dialog)(({ theme }) => ({
  [`&.${classes.root}`]: {
    margin: theme.spacing(4),
    padding: theme.spacing(4),
  },

  [`& .${classes.button}`]: {
    marginTop: 10,
  },
}));
