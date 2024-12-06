//React
import React, { Fragment } from "react";

//Material UI
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

//Regex
import { EMAIL_REGEX } from "../../constants/regex";

//Components
import WaitingModal from "../../components/WaitingModal";

//Form
import { useForm, Controller, SubmitHandler } from "react-hook-form";

//Style
import { formStyle, inputStyle, buttonStyle } from "./AuthForm.styles";

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
    <section>
      <form onSubmit={handleSubmit(onSubmit)} className={formStyle}>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{ required: true, pattern: EMAIL_REGEX }}
          render={({ field }) => (
            <TextField
              className={inputStyle}
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
              id="password"
              data-testid="password"
              className={inputStyle}
              {...field}
              label="Password"
              autoComplete="off"
              type="password"
              inputProps={{ input: "password" }}
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
          className={buttonStyle}
          type="submit"
        >
          {label}
        </Button>
      </form>
      <WaitingModal open={submitting} />
    </section>
  );
};

export default AuthForm;
