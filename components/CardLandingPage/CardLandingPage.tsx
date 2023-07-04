//React
import Image from "next/legacy/image";

//Material UI
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

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
  const Light_background_Color = "#c8e4fb";
  return (
    <Paper
      elevation={1}
      sx={{ background: Light_background_Color, padding: "3%" }}
    >
      <Typography variant="h6" align="center">
        {title}
      </Typography>
      <Typography variant="body1" align="center" sx={{ mt: 1, mr: 2, ml: 2 }}>
        {text}
      </Typography>
      <Image
        alt={imageAlt}
        src={imagePath}
        layout="responsive"
        width={imgWidth}
        height={imgHeight}
      />
    </Paper>
  );
};

export default CardLandingPage;
