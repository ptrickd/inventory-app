//React
import React from "react";

//Material UI
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { IProductByCategory } from "../../types/types";

interface IProps {
  product: IProductByCategory;
}

const ListProductsByCategory = ({ product }: IProps) => {
  return (
    <TableBody key={product.name}>
      <TableRow
        key={product.id}
        sx={{
          "&:last-child td, &:last-child th": { border: 0 },
        }}
      >
        <TableCell component="th" scope="row">
          {product.name}
        </TableCell>
        <TableCell align="right">{product.currentAmount}</TableCell>
        <TableCell align="right" data-testid={"product-previous-amount"}>
          {product.previousAmount}
        </TableCell>
        <TableCell align="right">{product.unit}</TableCell>
      </TableRow>
    </TableBody>
  );
};

export default ListProductsByCategory;
