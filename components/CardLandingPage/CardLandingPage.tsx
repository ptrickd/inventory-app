"use client";
//React
import Image from "next/image";

//Material UI
import { css } from "@pigment-css/react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

//Types
interface IProps {
  imagePath: any;
  imageAlt: string;
  imgWidth: number;
  imgHeight: number;
  text: string;
  title: string;
}

//Styles
const rootStyle = css(({ theme }) => ({
  backgroundColor: theme.colorSchemes.dark.palette.background.paper,

  "@media (prefers-color-scheme: light)": {
    backgroundColor: theme.colorSchemes.light.palette.background.paper,
  },
}));

const CardLandingPage = ({
  imagePath,
  imageAlt,
  text,
  title,
  imgWidth,
  imgHeight,
}: IProps) => {
  //temporary constant #648dae #829baf
  const Light_background_Color = "#6573c3";
  const Ratio = imgWidth + 20;
  return (
    // <Paper
    //   elevation={1}
    //   sx={{
    //     height: "auto",
    //     background: Light_background_Color,
    //     width: Ratio,
    //     padding: "3%",
    //     // border: "0px",
    //     // borderColor: "red",
    //     display: "flex",
    //     flexDirection: "column",
    //     alignItems: "center",
    //     alignSelf: "center",
    //   }}
    // >
    <div
      className={rootStyle}
      sx={{
        height: "auto",
        // background: Light_background_Color,
        // width: Ratio,
        padding: "3%",
        // border: "0px",
        // borderColor: "red",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        alignSelf: "center",
      }}
    >
      <Typography
        variant="h6"
        align="center"
        sx={{ textDecoration: "underline" }}
      >
        {title}
      </Typography>
      <Typography
        variant="body1"
        align="center"
        sx={{ mt: 1, mb: 2, mr: 2, ml: 2 }}
      >
        {text}
      </Typography>
      <Box
        component="section"
        sx={{
          height: "auto",
          // width: imgWidth,
          // border: "1px solid #aaaaaa",
        }}
      >
        <Image
          alt={imageAlt}
          src={imagePath}
          // style={{ border: "1px solid #aa0000" }}
          // width={imgWidth}
          // height={imgHeight}
        />
      </Box>
    </div>
    // </Paper>
  );
};

export default CardLandingPage;
