//Material UI
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

const PREFIX = "ListReports";

export const classes = {
  categoryDiv: `${PREFIX}-categoryDiv`,
  category: `${PREFIX}-category`,
};

export const Root = styled(Box)(({ theme: Theme }) => ({
  [`& .${classes.category}`]: {
    backgroundColor: Theme.palette.background.paper,
  },
}));
