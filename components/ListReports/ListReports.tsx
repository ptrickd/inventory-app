//React
import React from "react";

//Material UI
import Box from "@mui/material-pigment-css/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

//Components
import ListProductsByCategory from "../ListProductsByCategory";

//Style
import {} from "./ListReports.style";

//Types
interface IProductByCategory {
  id: string;
  name: string;
  currentAmount: number;
  previousAmount: number;
  unit: string;
  categoryId: string;
  position: number;
}
interface IReport {
  categoryName: string;
  productsList: IProductByCategory[] | [];
}
interface IProps {
  report: IReport;
}
const ListReports = ({ report }: IProps) => {
  return (
    <Box key={report.categoryName}>
      <TableContainer component={Paper}>
        <Table aria-label="report table">
          <TableHead>
            <TableRow>
              <TableCell>{report.categoryName}</TableCell>
              <TableCell align="right">Current </TableCell>
              <TableCell align="right">Last</TableCell>
              <TableCell align="right">Unit</TableCell>
            </TableRow>
          </TableHead>
          {report.productsList.map((product: IProductByCategory) => {
            return (
              <ListProductsByCategory key={product.name} product={product} />
            );
          })}
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ListReports;
