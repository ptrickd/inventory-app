//React
import React from "react";

//Material UI
import Typography from "@mui/material/Typography";

//Styles
import { classes, StyledBox } from "./DisplayMessage.style";

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
