//React
import Image from "next/legacy/image";

//Material UI
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

//Types
interface IProps {
  imagePath: string;
  imageAlt: string;
  imgWidth: number;
  imgHeight: number;
  text: string;
  title: string;
}
const CardLandingPage = ({
  imagePath,
  imageAlt,
  text,
  title,
  imgWidth,
  imgHeight,
}: IProps) => {
  //temporary constant #648dae #829baf
  const Light_background_Color = "rgba(101,115,195,0.2)";
  return (
    <Paper
      elevation={1}
      sx={{ background: Light_background_Color, padding: "3%", border: "0px" }}
    >
      <Typography variant="h6" align="center">
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
        component="span"
        sx={{
          // margin: " 32px auto",
          // boxSizing: "content-box",
          // display: "flex",
          // flexDirection: "column",
          // justifyContent: "center",
          // alignItems: "center",
          "& > div": {
            boxShadow:
              " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            borderRadius: "5px",
          },
        }}
      >
        <Image
          style={{ border: "3px solid #aaaaaa" }}
          alt={imageAlt}
          src={imagePath}
          layout="responsive"
          width={imgWidth}
          height={imgHeight}
        />
      </Box>
    </Paper>
  );
};

export default CardLandingPage;
