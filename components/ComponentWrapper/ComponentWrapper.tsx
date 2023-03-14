//React
import React, { Fragment, useContext } from "react";

//Material UI
import clsx from "clsx";

//Context
import { UserContext } from "../../contexts/UserContext";

//Styles
import { classes, Root } from "./ComponentWrapper.style";

interface IProps {
  children: React.ReactNode;
}

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
