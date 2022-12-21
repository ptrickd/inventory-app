//React
import React, { useEffect, Fragment } from "react";
import Link from "next/link";

//Material UI
import { makeStyles, Theme, createStyles } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";

//Color
import { TEXT_MENU_COLOR } from "../constants/colors";

//Icons
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import AddCircleIcon from "@material-ui/icons/AddCircle";

//GraphQL
import { gql, useQuery } from "@apollo/client";

//Date
import { DateTime } from "luxon";

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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuText: {
      // color: TEXT_MENU_COLOR,
      textTransform: "none",
      marginLeft: theme.spacing(1),
    },
  })
);

const NavbarReportsList = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { data, loading, error } = useQuery(GET_REPORTS);

  useEffect(() => {
    if (data?.reports?.reports) console.log(data.reports.reports);
  }, [data]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const renderedReportsMenu = () => {
    if (data?.reports?.reports.length === 0) {
      console.log("0 report now");
      return (
        <MenuItem onClick={handleCloseMenu}>
          <Typography variant="body1">No reports saved</Typography>
        </MenuItem>
      );
    }
    return data?.reports?.reports.map((report: IReport, index: number) => {
      // console.log(report)

      const dateTime = DateTime.fromISO(report?.dateEndingCycle.toString());
      const year = dateTime.year;
      const month = dateTime.month;
      const day = dateTime.day;
      return (
        <MenuItem onClick={handleCloseMenu} key={index}>
          <Link
            href={`/report/${report.id}`}
          >{`${year}-${month}-${day} `}</Link>
        </MenuItem>
      );
    });
  };

  if (loading) return null;
  if (error) return null;

  return (
    <Fragment>
      <Button
        className={classes.menuText}
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
    </Fragment>
  );
};

export default NavbarReportsList;
