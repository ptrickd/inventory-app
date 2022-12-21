//React
import React, { Fragment, useContext } from "react";

import { styled } from '@mui/material/styles';
import { createTheme } from "@mui/material/styles";
import { DRAWER_WIDTH } from "../constants/dimensions";
import clsx from "clsx";

//Context
import { UserContext } from "../contexts/UserContext";

const PREFIX = 'ComponentWrapper';

const classes = {
  main: `${PREFIX}-main`,
  toolbar: `${PREFIX}-toolbar`
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')((
  {
    theme
  }
) => ({
  [`& .${classes.main}`]: {
    marginLeft: 0,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${DRAWER_WIDTH}px)`,
      marginLeft: DRAWER_WIDTH,
    },
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },

  [`& .${classes.toolbar}`]: theme.mixins.toolbar
}));

interface IProps {
  children: React.ReactNode;
}
const theme = createTheme();

//Insure the transition of the pages when sidebar come and go
const ComponentWrapper = ({ children }: IProps) => {

  const { loggedIn } = useContext(UserContext);

  return (
    <Root>
      <div className={classes.toolbar} />
      <div className={clsx(loggedIn && classes.main)}>{children}</div>
    </Root>
  );
};

export default ComponentWrapper;
