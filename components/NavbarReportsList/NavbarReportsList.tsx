//React
import React from "react";
import Link from "next/link";

//Material UI
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Typography from "@mui/material/Typography";

//Color

//GraphQL
import { gql, useQuery } from "@apollo/client";

//Date
import { DateTime } from "luxon";

//Styles
import {
  classes,
  Root,
  StyledMenuItem,
  StyledLink,
} from "./NavbarReportsList.style";

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
            <StyledLink color="primary" underline="hover" variant="body1">
              <Typography variant="body1">{`${year}-${month}-${day} `}</Typography>
            </StyledLink>
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
