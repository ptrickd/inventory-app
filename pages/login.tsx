//React
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

//Material UI
import Button from "@mui/material/Button";

//Form
import { useForm, SubmitHandler } from "react-hook-form";

//GraphQL
import { useMutation } from "@apollo/client";
import { LOGIN } from "../graphql/queries";

//Context
import { UserContext } from "../contexts/UserContext";
import { ReportsContext } from "../contexts/ReportsContext";
import { CategoriesContext } from "../contexts/CategoriesContext";
import { ProductsContext } from "../contexts/ProductsContext";

//Components
import AuthForm from "../components/AuthForm";
import DisplayMessage from "../components/DisplayMessage";
import Footer from "../Layout/Footer";

//Function
import { redirectOnLogin } from "../utils/redirect";

//Styles
import { classes, Root, Main, Title } from "../styles/login.style";

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

  const { hasReport } = useContext(ReportsContext);
  const { hasCategory } = useContext(CategoriesContext);
  const { hasProduct } = useContext(ProductsContext);

  const [submitting, setSubmitting] = useState(false);
  const [serverErrorMess, setServerErrorMess] = useState("");

  const { reset } = useForm<IForm>();

  const [login] = useMutation(LOGIN);

  useEffect(() => {
    console.log(`hasReport ${hasReport}`);
    console.log(`hasCategory ${hasCategory}`);
    console.log(`hasProduct ${hasProduct}`);
    //Push to wiz wiz will redirect if incorrect
    //When loggedIn wait to be connected to all context
    if (loggedIn) {
      const url = redirectOnLogin(hasReport, hasCategory, hasProduct);
      if (url) router.push(url);
    }
  }, [loggedIn, hasReport, hasCategory, hasProduct, router]);

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
