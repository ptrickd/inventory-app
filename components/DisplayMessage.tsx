//React
import React from "react";

import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const PREFIX = "DisplayMessage";

const classes = {
  root: `${PREFIX}-root`,
};

const StyledBox = styled(Box)(({ theme: Theme }) => ({
  [`&.${classes.root}`]: {
    margin: Theme.spacing(1),
    padding: Theme.spacing(1),
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 5,
  },
}));

//Types definitions
interface IProps {
  message: string;
  show: boolean;
}

const DisplayMessage: React.FC<IProps> = ({ message, show }: IProps) => {
  if (!show) return null;
  return (
    <StyledBox className={classes.root}>
      <Typography color="error" align="center" variant="subtitle1">
        {message}
      </Typography>
    </StyledBox>
  );
};

export default DisplayMessage;
