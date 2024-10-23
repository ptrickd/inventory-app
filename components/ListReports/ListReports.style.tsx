//Material UI
import { styled } from "@mui/material-pigment-css";
import Box from "@mui/material-pigment-css/Box";

const PREFIX = "ListReports";

export const classes = {
  categoryDiv: `${PREFIX}-categoryDiv`,
  category: `${PREFIX}-category`,
};

export const Root = styled(Box)(() => ({
  [`& .${classes.category}`]: {
    // backgroundColor: Theme.palette.background.paper,
  },
}));
