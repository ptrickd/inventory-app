//React
import React from "react";

//Material UI
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

//Types definitions
interface IProps {
  message: string;
  show: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(1),
      padding: theme.spacing(1),
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "red",
      borderRadius: 5,
    },
  })
);

const DisplayMessage: React.FC<IProps> = ({ message, show }: IProps) => {
  const classes = useStyles();
  if (!show) return null;
  return (
    <Box className={classes.root}>
      <Typography color="error" align="center" variant="subtitle1">
        {message}
      </Typography>
    </Box>
  );
};

export default DisplayMessage;
