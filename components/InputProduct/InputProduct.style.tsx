//Material UI
import { styled } from "@mui/material/styles";

const PREFIX = "InputProduct";

export const classes = {
  root: `${PREFIX}-root`,
  formControl: `${PREFIX}-formControl`,
  innerFormControl: `${PREFIX}-innerFormControl`,
  textfield: `${PREFIX}-textfield`,
  selectUnit: `${PREFIX}-selectUnit`,
  box: `${PREFIX}-box`,
  lastAmountName: `${PREFIX}-lastAmountName`,
  lastAmountValue: `${PREFIX}-lastAmountValue`,
};

export const Root = styled("div")(({ theme }) => ({
  [`&.${classes.root}`]: {
    width: "100%",
  },

  [`& .${classes.formControl}`]: {
    marginTop: "8px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  [`& .${classes.innerFormControl}`]: {
    margin: theme.spacing(1),
    alignItems: "center",
  },

  [`& .${classes.textfield}`]: {},

  [`& .${classes.selectUnit}`]: {
    marginLeft: 5,
    marginRight: 5,
    minWidth: 50,
  },

  [`& .${classes.box}`]: {
    margin: theme.spacing(1),
    alignItems: "left",
  },

  [`& .${classes.lastAmountName}`]: {
    color: "rgba(0,0,0,0.54)",
    width: "100%",
    paddingLeft: theme.spacing(0.7),
  },

  [`& .${classes.lastAmountValue}`]: {
    height: "auto",
    padding: theme.spacing(0.7),
  },
}));
