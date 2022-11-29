//React
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";

//Material UI
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

//Form
import { useForm, Controller, SubmitHandler } from "react-hook-form";

//GraphQL
import { useMutation } from "@apollo/client";
import { REGISTER } from "../graphql/queries";

//Context
import { UserContext } from "../contexts/UserContext";

//Components
import AuthForm from "../components/AuthForm";

interface IForm {
  email: string;
  password: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      minHeight: "70vh",
      flexDirection: "column",
      justifyContent: "center",
      alignContent: "center",
    },
  })
);

const Register: React.FC = () => {
  const classes = useStyles();
  const router = useRouter();
  const { currentUser, setCurrentUser, loggedIn, setLoggedIn } =
    useContext(UserContext);
  const [submitting, setSubmitting] = useState(false);
  const [errorServerMess, setErrorServerMess] = useState("");

  const { reset } = useForm<IForm>();

  const [register] = useMutation(REGISTER);

  useEffect(() => {
    if (loggedIn) {
      router.push("/dashboard");
    }
  }, [loggedIn, router]);

  const onSubmit: SubmitHandler<IForm> = async (data) => {
    setSubmitting(true);
    const user = await register({
      variables: { email: data.email, password: data.password },
    });
    if (user.data.register.error) {
      setErrorServerMess(user.data.register.error);
    } else if (user?.data?.register.user) {
      setErrorServerMess("");
      router.push("/login");
    }
    setSubmitting(false);
    reset({ email: "", password: "" });
  };

  return (
    <Container className={classes.root} maxWidth="xs">
      <Typography variant="h2" align="center">
        Register
      </Typography>
      {errorServerMess.length > 1 && (
        <Typography align="center" color="secondary">
          {errorServerMess}
        </Typography>
      )}
      <AuthForm onSubmit={onSubmit} submitting={submitting} label="Register" />
    </Container>
  );
};

export default Register;
