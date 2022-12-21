//React
import React, {
  useState,
  useEffect,
  useContext,
  Fragment,
  ChangeEvent,
} from "react";

//Context
import { ProductsContext } from "../contexts/ProductsContext";

//Components
import EditProductForm from "./EditProductForm";

//Material UI

import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { makeStyles } from "@mui/material/styles";
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
import { IProduct } from "../types/types";

//Constants
import { MEASURE_UNITS } from "../constants/measureUnits";

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

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  formControl: {
    marginTop: "8px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  innerFormControl: {
    margin: theme.spacing(1),
    alignItems: "center",
  },
  textfield: {},
  selectUnit: {
    marginLeft: 5,
    marginRight: 5,
    minWidth: 50,
  },
  box: {
    margin: theme.spacing(1),
    alignItems: "left",
  },
  lastAmountName: {
    color: "rgba(0,0,0,0.54)",
    width: "100%",
    paddingLeft: theme.spacing(0.7),
  },
  lastAmountValue: {
    height: "auto",
    padding: theme.spacing(0.7),
  },
}));

const InputProduct: React.FC<IProps> = ({
  name,
  currentAmount,
  previousAmount,
  id,
  categoryId,
  showAmounts,
  measureUnit,
}) => {
  const classes = useStyles();
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
    }
  }, [currentMeasureUnit, id, measureUnit, saveNewUnit]);

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
    <div className={classes.root}>
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
    </div>
  );
};

export default InputProduct;
