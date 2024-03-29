//Material UI
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";

const PREFIX = "AddCategoryForm";

export const classes = {
  content: `${PREFIX}-content`,
  buttons: `${PREFIX}-buttons`,
  input: `${PREFIX}-input`,
};

export const StyledDialog = styled(Dialog)({
  [`& .${classes.content}`]: {
    display: "flex",
    flexDirection: "column",
  },
  [`& .${classes.buttons}`]: {
    marginTop: 5,
    display: "flex",
    justifyContent: "space-around",
  },
  [`& .${classes.input}`]: {
    display: "flex",
    flexDirection: "column",
  },
});
