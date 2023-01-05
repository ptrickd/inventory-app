/*
/components
/utils
/modals
/graphql
  /queries
  /mutations
*/
//React
import { Fragment, useContext, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

//Material UI
import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";

//Context
import { UserContext } from "../contexts/UserContext";

//Component
import Footer from "../Layout/Footer";

const PREFIX = "index";
const classes = {
  root: `${PREFIX}--root`,
  title: `$(PREFIX)--title`,
  subtitle: `$(PREFIX)--subtitle`,
  button: `$(PREFIX)--button`,
};
const StyledContainer = styled(Container)(({ theme: Theme }) => ({
  [`&.${classes.root}`]: {
    position: "relative",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
  },
}));
const StyledTypography = styled(Typography)(({ theme: Theme }) => ({
  [`&.${classes.title}`]: { marginBottom: 20 },
  [`&.${classes.subtitle}`]: { marginBottom: 20 },
}));
const StyledButton = styled(Button)(({ theme: Theme }) => ({
  [`&.${classes.button}`]: {
    width: "70%",
    marginBottom: "15%",
    borderRadius: 15,
  },
}));

export default function Home() {
  const { loggedIn } = useContext(UserContext);
  // const { states } = useContext(StatesContext);
  const router = useRouter();

  useEffect(() => {
    if (loggedIn) {
      router.push("/loading");
    }
  }, [loggedIn, router]);
  // if (loggedIn) router.push("/loading");
  return (
    <Fragment>
      <CssBaseline />
      <StyledContainer className={classes.root} maxWidth="md">
        {/* <div> */}
        <StyledTypography className={classes.title} variant="h4" align="center">
          Gruyere
        </StyledTypography>
        <StyledTypography
          className={classes.subtitle}
          variant="h5"
          align="center"
        >
          Your Kitchen Inventory App Management
        </StyledTypography>
        <Image
          alt="stock photo"
          src="/nathan-dumlao-g8gOnhMRckw-unsplash_working.jpg"
          width={500}
          height={300}
        />
        <Link href="/login">
          <Button
            className={classes.button}
            // fullWidth
            variant="contained"
            color="primary"
            size="large"
          >
            Start
          </Button>
        </Link>
        <Footer />
      </StyledContainer>
    </Fragment>
  );
}
