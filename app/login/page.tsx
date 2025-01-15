"use client";
//React
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";

//Material UI
import Box from "@mui/material/Box";

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

//Form
import { useForm, SubmitHandler } from "react-hook-form";

//GraphQL
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../graphql/queries";

//Context
import { UserContext } from "../../contexts/UserContext";
import { ReportsContext } from "../../contexts/ReportsContext";
import { CategoriesContext } from "../../contexts/CategoriesContext";
import { ProductsContext } from "../../contexts/ProductsContext";

//Components
import AuthForm from "../../components/AuthForm";
import DisplayMessage from "../../components/DisplayMessage";

//Styles
import { rootStyle, mainStyle, titleStyle } from "../../styles/login.style";

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
    if (loggedIn) {
      router.push("/dashboard");
    }
  }, [loggedIn, router]);

  // //useEffect(() => {
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
      console.log("server response");
      console.log(loginResponse.data);
      setCurrentUser({
        id: loginResponse.data.login.user.id,
        email: loginResponse.data.login.user.email,
        theme: loginResponse.data.login.user.theme,
        isWizardEnabled: loginResponse.data.login.user.isWizardEnabled,
      });
    }
    setSubmitting(false);
    reset({ email: "", password: "" });
  };

  return (
    <Container className={rootStyle} maxWidth="xs">
      <Box className={mainStyle}>
        <Typography variant="h2" align="center" className={titleStyle}>
          Login
        </Typography>

        <DisplayMessage
          message={serverErrorMess}
          show={Boolean(serverErrorMess.length)}
        />
        <AuthForm onSubmit={onSubmit} submitting={submitting} label="Login" />

        <Button
          color="inherit"
          variant="contained"
          onClick={(e) => {
            e.preventDefault();
            router.push("/register");
          }}
        >
          Register
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
