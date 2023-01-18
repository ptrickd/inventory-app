//React
import React from "react";

//Material UI
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

//Components
import ListProductsByCategory from "./ListProductsByCategory";

//Style
const PREFIX = "ListReports";

const classes = {
  categoryDiv: `${PREFIX}-categoryDiv`,
  category: `${PREFIX}-category`,
};

const Root = styled(Box)(({ theme: Theme }) => ({
  [`& .${classes.category}`]: {
    backgroundColor: Theme.palette.common.black,
  },
}));

//Types
interface IProduct {
  id: string;
  name: string;
  currentAmount: number;
  previousAmount: number;
  unit: string;
}
interface IReport {
  categoryName: string;
  productsList: IProduct[] | [];
}
interface IProps {
  report: IReport;
}
const ListReports = ({ report }: IProps) => {
  return (
    <Root
      component="div"
      key={report.categoryName}
      className={classes.categoryDiv}
    >
      <TableContainer component={Paper}>
        <Table aria-label="report table">
          <TableHead className={classes.category}>
            <TableRow>
              <TableCell>{report.categoryName}</TableCell>
              <TableCell align="right">Current </TableCell>
              <TableCell align="right">Last</TableCell>
              <TableCell align="right">Unit</TableCell>
            </TableRow>
          </TableHead>
          {report.productsList.map((product: IProduct) => {
            return (
              <ListProductsByCategory key={product.name} product={product} />
            );
          })}
        </Table>
      </TableContainer>
    </Root>
  );
};

export default ListReports;
