"use client";
//React
import React, { useState, useEffect, useContext } from "react";
import { css } from "@pigment-css/react";
import { useRouter } from "next/navigation";

//Material UI
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

//Form
import { useForm, SubmitHandler } from "react-hook-form";

//GraphQL
import { useMutation } from "@apollo/client";
import { REGISTER } from "../../graphql/queries";

//Context
import { UserContext } from "../../contexts/UserContext";

//Components
import AuthForm from "../../components/AuthForm";
import DisplayMessage from "../../components/DisplayMessage";
import Footer from "../../Layout/Footer";

const rootStyle = css({
  display: "flex",
  minHeight: "calc(100vh - 100px)",
  flexDirection: "column",
  width: "100%",
});
const mainStyle = css({
  display: "flex",
  flexDirection: "column",
  marginTop: "15%",
  width: "100%",
  minHeight: "70vh",
  alignContent: "space-between",
});

const titleStyle = css({ marginBottom: 15 });

interface IForm {
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const router = useRouter();
  const { loggedIn } = useContext(UserContext);
  const [submitting, setSubmitting] = useState(false);
  const [serverErrorMess, setServerErrorMess] = useState("");

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
      setServerErrorMess(user.data.register.error);
    } else if (user?.data?.register.user) {
      setServerErrorMess("");
      router.push("/login");
    }
    setSubmitting(false);
    reset({ email: "", password: "" });
  };

  return (
    <Container className={rootStyle} maxWidth="xs">
      <Box className={mainStyle}>
        <Typography variant="h2" align="center" className={titleStyle}>
          Register
        </Typography>
        <DisplayMessage
          message={serverErrorMess}
          show={Boolean(serverErrorMess.length)}
        />
        <AuthForm
          onSubmit={onSubmit}
          submitting={submitting}
          label="Register"
        />
      </Box>
    </Container>
  );
};

export default Register;
