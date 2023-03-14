//Material UI
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

const PREFIX = "DisplayMessage";

export const classes = {
  root: `${PREFIX}-root`,
};

export const StyledBox = styled(Box)(({ theme: Theme }) => ({
  [`&.${classes.root}`]: {
    margin: Theme.spacing(1),
    padding: Theme.spacing(1),
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 5,
  },
}));
