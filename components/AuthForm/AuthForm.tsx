//React
import React, { Fragment } from "react";

//Material UI
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

//Regex
import { EMAIL_REGEX } from "../../constants/regex";

//Components
import WaitingModal from "../../components/WaitingModal";

//Form
import { useForm, Controller, SubmitHandler } from "react-hook-form";

//Style
import { classes, Root } from "./AuthForm.styles";

interface IForm {
  email: string;
  password: string;
}

interface IProps {
  onSubmit: (data: IForm) => void;
  submitting: boolean;
  label: string;
}

const AuthForm = ({ onSubmit, submitting, label }: IProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();

  return (
    <Root>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{ required: true, pattern: EMAIL_REGEX }}
          render={({ field }) => (
            <TextField
              className={classes.input}
              {...field}
              label="Email"
              autoComplete="off"
            />
          )}
        />
        {errors.email?.type === "required" && <span>*Required</span>}
        {errors.email?.type === "pattern" && <span>Must be a valid email</span>}
        <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={{ required: true, minLength: 6 }}
          render={({ field }) => (
            <TextField
              className={classes.input}
              {...field}
              label="Password"
              autoComplete="off"
              type="password"
            />
          )}
        />
        {errors.password?.type === "required" && <span>*Required</span>}
        {errors.password?.type === "minLength" && (
          <span>Must be at least 6 characters</span>
        )}
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          type="submit"
        >
          {label}
        </Button>
      </form>
      <WaitingModal open={submitting} />
    </Root>
  );
};

export default AuthForm;
