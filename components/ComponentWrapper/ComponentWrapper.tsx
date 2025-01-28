"use client";
//React
import React, { Fragment, useContext } from "react";

//Material UI
import clsx from "clsx";

//Context
import { UserContext } from "../../contexts/UserContext";

//Styles
import { mainStyle } from "./ComponentWrapper.style";

interface IProps {
  children: React.ReactNode;
}

//Insure the transition of the pages when sidebar come and go
const ComponentWrapper = ({ children }: IProps) => {
  const { loggedIn } = useContext(UserContext);

  return (
    <section>
      {/* className={toolbarStyle}  empty class*/}

      <div className={clsx(loggedIn && mainStyle)}>
        <h1>kdkdkdkdk</h1>
        {children}
      </div>
      {/* className={clsx(loggedIn && mainStyle)} */}
    </section>
  );
};

export default ComponentWrapper;
