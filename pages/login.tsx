//React
import React, { useState, useEffect, useContext } from "react";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import Link from "next/link";

//Material UI
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

//Form
import { useForm, SubmitHandler } from "react-hook-form";

//GraphQL
import { useMutation } from "@apollo/client";
import { LOGIN } from "../graphql/queries";

//Context
import { UserContext } from "../contexts/UserContext";

//Components
import AuthForm from "../components/AuthForm";
import DisplayMessage from "../components/DisplayMessage";
import Footer from "../Layout/Footer";

const PREFIX = "Login";

const classes = {
  root: `${PREFIX}-root`,
  main: `${PREFIX}-main`,
  title: `${PREFIX}-title`,
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
    width: "100%",
    minHeight: "70vh",
    alignContent: "space-between",
  },
}));

const Title = styled(Typography)(() => ({
  [`&.${classes.title}`]: { marginBottom: 15 },
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
    setTheme,
  } = useContext(UserContext);
  const [submitting, setSubmitting] = useState(false);
  const [serverErrorMess, setServerErrorMess] = useState("");

  const { reset } = useForm<IForm>();

  const [login] = useMutation(LOGIN);

  useEffect(() => {
    //Push to wiz wiz will redirect if incorrect
    if (loggedIn) {
      router.push("/wiz");
    }
  }, [loggedIn, router]);

  // useEffect(() => {
  //   // let responseTimeout: any = null;
  //   if (submitting) {
  //     const responseTimeout = setTimeout(() => {
  //       // console.log("6 seconds wait");
  //       setServerErrorMess("Server not responding");
  //       setSubmitting(false);
  //     }, 6000);
  //   }
  // }, [submitting]);

  const onSubmit: SubmitHandler<IForm> = async (data) => {
    setSubmitting(true);
    const loginResponse = await login({
      variables: { email: data.email, password: data.password },
    });
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
      setToken !== undefined &&
      setTheme !== undefined
    ) {
      setToken(loginResponse.data.login.token);
      setTheme(loginResponse.data.login.user.theme);
      setServerErrorMess("");
      setCurrentUser({
        id: loginResponse.data.login.user.id,
        email: loginResponse.data.login.user.email,
      });
    }
    setSubmitting(false);
    reset({ email: "", password: "" });
  };

  return (
    <Root className={classes.root} maxWidth="xs">
      <Main component="div" className={classes.main}>
        <Title variant="h2" align="center" className={classes.title}>
          Login
        </Title>

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
      </Main>

      <Footer />
    </Root>
  );
};

export default Login;
