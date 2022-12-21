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
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import CssBaseline from "@mui/material/CssBaseline";

//Context
import { UserContext } from "../contexts/UserContext";
import { StatesContext } from "../contexts/StatesContext";

const PREFIX = "index";
const classes = {
  root: `${PREFIX}--root`,
  title: `$(PREFIX)--title`,
  subtitle: `$(PREFIX)--subtitle`,
  button: `$(PREFIX)--button`,
};
const StyledContainer = styled(Container)(({ theme: Theme }) => ({
  [`&.${classes.root}`]: {
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
//  section: {
//       marginTop: 50;
//       flexGrow: 1;
//       width: "100%";
//     };
//     image: {
//       display: "flex";
//       justifyContent: "center";
//     };

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
        {/* <Grid
            className={classes.section}
            container
            justify="center"
            alignItems="center"
            spacing={3}
          > */}
        {/* <Grid item xs={12} md={6}>
              <Paper>
                <Typography variant="body1">
                  orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more rece Lorem Ipsum
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper className={classes.image}>
                <Image

                  src="/screenshot1.jpg"
                  alt="Screenshot"
                  width={300}
                  height={300}
                />
              </Paper>
            </Grid>
          </Grid> */}
        {/* </div> */}
      </StyledContainer>
    </Fragment>
  );
}
