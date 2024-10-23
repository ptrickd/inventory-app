//React
import React, { useState, useEffect, useContext } from "react";

//Context
import { UserContext } from "../contexts/UserContext";

//Material UI
import { styled } from "@mui/material-pigment-css";
import Container from "@mui/material-pigment-css/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material-pigment-css/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material-pigment-css/Grid";

//Icons
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

//Component
import FirstReport from "../components/FirstReport";
import FirstCategory from "../components/FirstCategory";
import FirstProduct from "../components/FirstProduct";

const PREFIX = "Test";

const classes = {
  root: `${PREFIX}-root`,
  styledPaper: `${PREFIX}-styled-paper`,
};

const Root = styled(Container)(() => ({
  [`&.${classes.root}`]: {
    width: "100%",
    minHeight: "calc(100vh - 120px)",
    margin: 5,
    // display: "flex",
    // flexDirection: "column",
    // justifyContent: "center",
    // background: "red",
  },
}));

const StyledPaper = styled(Paper)(() => ({
  [`&.${classes.styledPaper}`]: {
    width: "100%",
    minHeight: "70vh",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
}));

const Test: React.FC = () => {
  //Context
  const { currentUser } = useContext(UserContext);

  //useState
  const [pageNumber, setPageNumber] = useState(0);

  //Functions
  const componentToRender = () => {
    switch (pageNumber) {
      case 0:
        return <FirstReport />;
        break;
      case 1:
        return <FirstCategory />;
        break;

      case 2:
        return <FirstProduct />;
        break;
      default:
        break;
    }
  };
  const decreasePageNumber = () => {
    if (pageNumber > 0) {
      setPageNumber(pageNumber - 1);
    }
  };

  const increasePageNumber = () => {
    if (pageNumber < 2) {
      setPageNumber(pageNumber + 1);
    }
  };

  //useEffect
  useEffect(() => {
    console.log(pageNumber);
  }, [pageNumber]);
  if (typeof currentUser === "undefined") return <div>Error</div>;
  return (
    <Root className={classes.root}>
      <StyledPaper className={classes.styledPaper} elevation={1}>
        <Box
          component="div"
          sx={{
            flexGrow: 1,
            // justifyContent: "center",
            // aligItems: "center",
            // alignContent: "center",
            // height: "100%",
          }}
        >
          <Grid
            container
            spacing={2}
            sx={{
              flexGrow: 1,
              justifyContent: "center",
              aligItems: "baseline",
              alignContent: "center",
              height: "100%",
            }}
          >
            <Grid item xs={1} sx={{ alignSelf: "center" }}>
              <IconButton onClick={decreasePageNumber}>
                <ArrowBackIosIcon />
              </IconButton>
            </Grid>

            <Grid item xs={8}>
              <Box
                component="div"
                // sx={{ flexGrow: 1, height: "100%", border: "1px solid" }}
              >
                {componentToRender()}
              </Box>
            </Grid>
            <Grid item xs={1} sx={{ alignSelf: "center" }}>
              <IconButton onClick={increasePageNumber}>
                <ArrowForwardIosIcon />
              </IconButton>
            </Grid>
            <Typography>Check this box to not see again!</Typography>
          </Grid>
        </Box>
      </StyledPaper>
    </Root>
  );
};

export default Test;
