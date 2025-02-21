"use client";
//React
import React, { useContext } from "react";

//Material UI
import clsx from "clsx";

//Context
import { UserContext } from "../../contexts/UserContext";

//Styles
import { rootStyle, mainStyle } from "./ComponentWrapper.style";

interface IProps {
  children: React.ReactNode;
}

//Insure the transition of the pages when sidebar come and go
const ComponentWrapper = ({ children }: IProps) => {
  const { loggedIn } = useContext(UserContext);

  return (
    <section className={rootStyle}>
      <div className={clsx(loggedIn && mainStyle)}>{children}</div>
    </section>
  );
};

export default ComponentWrapper;
