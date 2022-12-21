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
import makeStyles from "@mui/styles/makeStyles";
import { Theme, createStyles } from "@mui/styles";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import CssBaseline from "@mui/material/CssBaseline";

//Context
import { UserContext } from "../contexts/UserContext";
import { StatesContext } from "../contexts/StatesContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-around",
    },
    title: {
      // marginTop: "15%",
      marginBottom: 20,
    },
    subTitle: {
      marginBottom: 20,
    },
    section: {
      marginTop: 50,
      flexGrow: 1,
      width: "100%",
    },
    image: {
      display: "flex",
      justifyContent: "center",
    },
    button: {
      width: "70%",
      marginBottom: "15%",
      borderRadius: 15,
    },
  })
);

export default function Home() {
  const classes = useStyles();
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
      <Container maxWidth="md">
        <div className={classes.root}>
          <Typography className={classes.title} variant="h4" align="center">
            Gruyere
          </Typography>
          <Typography className={classes.subTitle} variant="h5" align="center">
            Your Kitchen Inventory App Management
          </Typography>
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
        </div>
      </Container>
    </Fragment>
  );
}
