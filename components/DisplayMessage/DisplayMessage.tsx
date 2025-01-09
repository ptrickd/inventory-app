"use client";
//React
import React from "react";

//Material UI
import Box from "@mui/material-pigment-css/Box";
import Typography from "@mui/material/Typography";

//Styles
import { rootStyle } from "./DisplayMessage.style";

//Types definitions
interface IProps {
  message: string;
  show: boolean;
}

const DisplayMessage: React.FC<IProps> = ({ message, show }: IProps) => {
  if (!show) return null;
  return (
    <Box className={rootStyle}>
      <Typography color="error" align="center" variant="subtitle1">
        {message}
      </Typography>
    </Box>
  );
};

export default DisplayMessage;
