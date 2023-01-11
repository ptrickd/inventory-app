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
import Box from "@mui/material/Box";

//Context
import { UserContext } from "../contexts/UserContext";

//Component
import Footer from "../Layout/Footer";

const PREFIX = "index";
const classes = {
  root: `${PREFIX}--root`,
  main: `${PREFIX}-main`,
  title: `$(PREFIX)--title`,
  subtitle: `$(PREFIX)--subtitle`,
  button: `$(PREFIX)--button`,
};
const Root = styled(Container)(({ theme: Theme }) => ({
  [`&.${classes.root}`]: {
    display: "flex",
    minHeight: "calc(100vh - 120px)",
    flexDirection: "column",
    width: "100%",
  },
}));

const Main = styled(Box)(() => ({
  [`&.${classes.main}`]: {
    display: "flex",
    flexDirection: "column",
    marginTop: "15%",
    marginBottom: "10%",
    width: "100%",
    minHeight: "70vh",
    alignContent: "space-between",
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
      router.push("/wiz");
    }
  }, [loggedIn, router]);
  return (
    <Root className={classes.root} maxWidth="md">
      <Main className={classes.main}>
        <StyledTypography className={classes.title} variant="h4" align="center">
          Gruyere
        </StyledTypography>
        <StyledTypography
          className={classes.subtitle}
          variant="h5"
          align="center"
          sx={{ marginTop: 10, marginBottom: 10 }}
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
          <StyledButton
            className={classes.button}
            // fullWidth
            variant="contained"
            color="primary"
            size="large"
          >
            Start
          </StyledButton>
        </Link>
      </Main>
      <Footer />
    </Root>
  );
}
