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
  const Ratio = imgWidth + 20;
  return (
    <Paper
      elevation={1}
      sx={{
        height: "auto",
        background: Light_background_Color,
        width: Ratio,
        padding: "3%",
        border: "0px",
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
        component="span"
        sx={{
          height: "auto",
          width: imgWidth,
          border: "1px solid #aaaaaa",
        }}
      >
        <Image
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
