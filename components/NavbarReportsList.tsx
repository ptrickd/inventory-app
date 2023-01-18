//React
import React, { useEffect, Fragment } from "react";
import { styled } from "@mui/material/styles";
import Link from "next/link";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";

//Color
import { TEXT_MENU_COLOR, BACKGROUND_MENU_COLOR } from "../constants/colors";

//Icons
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";

//GraphQL
import { gql, useQuery } from "@apollo/client";

//Date
import { DateTime } from "luxon";

const PREFIX = "NavbarReportsList";

const classes = {
  menuText: `${PREFIX}-menuText`,
  list: `${PREFIX}-list`,
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled("div")(({ theme: Theme }) => ({
  [`&.${classes.menuText}`]: {
    // color: TEXT_MENU_COLOR,
    textTransform: "none",
    marginLeft: Theme.spacing(1),
    margin: 0,
  },
}));

const StyledMenuItem = styled(MenuItem)(({ theme: Theme }) => ({
  [`&.${classes.list}`]: {
    background: BACKGROUND_MENU_COLOR,
    margin: 0,
  },
}));

interface IReport {
  id: string;
  userId: string;
  dateEndingCycle: Date;
}

const GET_REPORTS = gql`
  query Reports {
    reports {
      reports {
        id
        dateEndingCycle
      }
      error
    }
  }
`;

const NavbarReportsList = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { data, loading, error } = useQuery(GET_REPORTS);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const renderedReportsMenu = () => {
    if (data?.reports?.reports.length === 0) {
      return (
        <MenuItem onClick={handleCloseMenu}>
          <Typography variant="body1">No reports</Typography>
        </MenuItem>
      );
    }
    return data?.reports?.reports.map((report: IReport, index: number) => {
      const dateTime = DateTime.fromISO(report?.dateEndingCycle.toString());
      const year = dateTime.year;
      const month = dateTime.month;
      const day = dateTime.day;
      return (
        <StyledMenuItem
          onClick={handleCloseMenu}
          key={index}
          className={classes.list}
        >
          {" "}
          <Link href={`/report/${report.id}`}>
            <Typography variant="body1">{`${year}-${month}-${day} `}</Typography>
          </Link>
        </StyledMenuItem>
      );
    });
  };

  if (loading) return null;
  if (error) return null;

  return (
    <Root>
      <Button
        color="inherit"
        aria-controls="report-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        Reports
      </Button>
      <Menu
        id="report-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        {renderedReportsMenu()}
      </Menu>
      {/* <ListItem button key='dashboard'>
                <ListItemText primary='Reports' />
                <ListItemIcon className={classes.menuIcon}>
                    {false ? <RemoveCircleIcon /> : <AddCircleIcon />}
                </ListItemIcon>
                {data.reports.reports.length ? <span>
                    <ListItemText primary='Repos' />
                    <ListItemIcon className={classes.menuIcon}>
                        {false ? <RemoveCircleIcon /> : <AddCircleIcon />}
                    </ListItemIcon>
                </span> : null}
            </ListItem> */}
    </Root>
  );
};

export default NavbarReportsList;
