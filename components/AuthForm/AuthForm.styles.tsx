//Material UI
import { styled } from "@mui/material/styles";

const PREFIX = "AuthForm";

export const classes = {
  form: `${PREFIX}-form`,
  input: `${PREFIX}-input`,
  button: `${PREFIX}-button`,
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
export const Root = styled("div")(({ theme }) => ({
  [`& .${classes.form}`]: {
    display: "flex",
    flexDirection: "column",
  },

  [`& .${classes.input}`]: {
    marginBottom: 15,
  },

  [`& .${classes.button}`]: {
    marginTop: 15,
    marginBottom: 15,
  },
}));
