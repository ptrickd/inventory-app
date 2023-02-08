//React
import React, { useState, useEffect, useContext, Fragment } from "react";

//Context
import { ProductsContext } from "../../contexts/ProductsContext";

//Components
import EditProductForm from "../EditProductForm";

//Material UI

import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";

//Icons
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

//Graphql
import { gql, useMutation } from "@apollo/client";

//Types
import { IProduct } from "../../types/types";

//Constants
import { MEASURE_UNITS } from "../../constants/measureUnits";

//Styles
import { classes, Root } from "./InputProduct.style";

const UPDATE_AMOUNT = gql`
  mutation SaveAmountProduct($productId: ID!, $updatedAmount: Int!) {
    saveAmountProduct(productId: $productId, updatedAmount: $updatedAmount) {
      id
    }
  }
`;

const UPDATE_UNIT = gql`
  mutation SaveUnitProduct($productId: ID!, $updatedUnit: String!) {
    saveUnitProduct(productId: $productId, updatedUnit: $updatedUnit) {
      id
    }
  }
`;

type IProps = {
  name: string;
  currentAmount: number;
  previousAmount: number;
  id: string;
  categoryId: string;
  showAmounts: boolean;
  measureUnit: string;
};

const InputProduct: React.FC<IProps> = ({
  name,
  currentAmount,
  previousAmount,
  id,
  categoryId,
  showAmounts,
  measureUnit,
}) => {
  const { products, updateProducts, deleteProductApi } =
    useContext(ProductsContext);
  const [openEditProductForm, setOpenEditProductModal] =
    useState<boolean>(false);
  const [currentMeasureUnit, setCurrentMeasureUnit] =
    useState<string>(measureUnit);
  const [amount, setAmount] = useState(currentAmount.toString());
  const [saveAmountProduct, { data }] = useMutation(UPDATE_AMOUNT);
  const [saveNewUnit] = useMutation(UPDATE_UNIT);

  useEffect(() => {
    const updateUnit = async () => {
      await saveNewUnit({
        variables: {
          productId: id,
          updatedUnit: currentMeasureUnit,
        },
      });
    };
    if (measureUnit !== currentMeasureUnit) {
      updateUnit();
      if (products) {
        const newProductsList = products.map((product) => {
          if (product.id === id) {
            return { ...product, unit: currentMeasureUnit };
          } else return product;
        });
        if (updateProducts) updateProducts(newProductsList);
      }
    }
  }, [
    currentMeasureUnit,
    id,
    measureUnit,
    saveNewUnit,
    products,
    updateProducts,
  ]);

  const handleEditAddProductForm = () => setOpenEditProductModal(false);

  const handleUnitChange = async (e: any) => {
    setCurrentMeasureUnit(e?.target?.value);
  };
  const saveProductOnBlur = async () => {
    await saveAmountProduct({
      variables: {
        productId: id,
        updatedAmount: parseInt(amount),
      },
    });
    let newProductsList = products?.map((product: IProduct) => {
      if (product.id === id) {
        let newProduct = JSON.parse(JSON.stringify(product));
        return Object.assign(newProduct, { currentAmount: parseInt(amount) });
      }
      return product;
    });
    if (updateProducts && newProductsList) updateProducts(newProductsList);
  };

  const bodyWithAmount = () => (
    <Fragment>
      <FormControl className={classes.innerFormControl}>
        <TextField
          id={name + "current"}
          label={"Current"}
          color="primary"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          onBlur={saveProductOnBlur}
          variant="standard"
          fullWidth
          className={classes.textfield}
        />
      </FormControl>

      <FormControl className={classes.innerFormControl}>
        <InputLabel>Unit</InputLabel>
        <Select
          labelId={name + "labelID-select"}
          id={name + "select"}
          value={currentMeasureUnit}
          onChange={handleUnitChange}
          variant="standard"
          className={classes.selectUnit}
        >
          {MEASURE_UNITS.map((unitName: string) => {
            return (
              <MenuItem key={unitName} value={unitName}>
                {unitName}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <FormControl className={classes.innerFormControl}></FormControl>
    </Fragment>
  );

  return (
    <Root className={classes.root}>
      {showAmounts && <Typography variant="h6">{name}</Typography>}
      <FormControl className={classes.formControl} fullWidth>
        {!showAmounts && <Typography variant="h6">{name}</Typography>}
        {showAmounts && bodyWithAmount()}
        <Box className={classes.box} width="15%">
          <Typography variant="caption" className={classes.lastAmountName}>
            Last
          </Typography>
          <Typography align="left" className={classes.lastAmountValue}>
            {previousAmount}
          </Typography>
        </Box>
        <IconButton onClick={(e) => setOpenEditProductModal(true)}>
          <EditIcon />
        </IconButton>

        <IconButton
          onClick={(e) => {
            if (deleteProductApi !== undefined) deleteProductApi(id);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </FormControl>
      <EditProductForm
        open={openEditProductForm}
        handleCloseModal={handleEditAddProductForm}
        productId={id}
        categoryId={categoryId}
        productName={name}
      />
    </Root>
  );
};

export default InputProduct;
