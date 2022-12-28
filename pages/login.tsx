//React
import React, { useState, useEffect, useContext } from "react";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import Link from "next/link";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

//Form
import { useForm, Controller, SubmitHandler } from "react-hook-form";

//GraphQL
import { useMutation } from "@apollo/client";
import { LOGIN } from "../graphql/queries";

//Context
import { UserContext } from "../contexts/UserContext";

//Components
import AuthForm from "../components/AuthForm";
import DisplayMessage from "../components/DisplayMessage";

const PREFIX = "Login";

const classes = {
  root: `${PREFIX}-root`,
};

const StyledContainer = styled(Container)(({ theme: Theme }) => ({
  [`&.${classes.root}`]: {
    display: "flex",
    minHeight: "70vh",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
  },
}));

interface IForm {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const router = useRouter();
  const {
    currentUser,
    setCurrentUser,
    loggedIn,
    setLoggedIn,
    setToken,
    logout,
  } = useContext(UserContext);
  const [submitting, setSubmitting] = useState(false);
  const [serverErrorMess, setServerErrorMess] = useState("");

  const { reset } = useForm<IForm>();

  const [login] = useMutation(LOGIN);

  useEffect(() => {
    if (loggedIn) {
      router.push("/loading");
    }
  }, [loggedIn, router]);

  useEffect(() => {
    // let responseTimeout: any = null;
    if (submitting) {
      const responseTimeout = setTimeout(() => {
        // console.log("6 seconds wait");
        setServerErrorMess("Server not responding");
        setSubmitting(false);
      }, 6000);
    }
  }, [submitting]);

  const onSubmit: SubmitHandler<IForm> = async (data) => {
    setSubmitting(true);
    const loginResponse = await login({
      variables: { email: data.email, password: data.password },
    });
    // console.log(loginResponse?.data?.login?.user);
    if (loginResponse?.data?.login?.error && setLoggedIn && logout) {
      console.log("Error::", loginResponse.data.login.error);
      setServerErrorMess(loginResponse.data.login.error);
      // logout();
      setLoggedIn(false);
    } else if (
      loginResponse?.data?.login?.user &&
      currentUser !== undefined &&
      setCurrentUser !== undefined &&
      setLoggedIn !== undefined &&
      setToken !== undefined
    ) {
      // console.log("in else if");
      setCurrentUser(loginResponse.data.login.user);
      setToken(loginResponse.data.login.token);
      setLoggedIn(true);
      setServerErrorMess("");
    }
    // console.log("after all if");
    setSubmitting(false);
    reset({ email: "", password: "" });
  };

  return (
    <StyledContainer className={classes.root} maxWidth="xs">
      <Typography variant="h2" align="center">
        Login
      </Typography>
      <DisplayMessage
        message={serverErrorMess}
        show={Boolean(serverErrorMess.length)}
      />
      <AuthForm onSubmit={onSubmit} submitting={submitting} label="Login" />

      <Link href="/register">
        <Button color="inherit" variant="contained">
          Register
        </Button>
      </Link>
    </StyledContainer>
  );
};

export default Login;
