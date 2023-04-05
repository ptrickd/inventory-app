//React
import React, { useState, useEffect, useContext, Fragment } from "react";

//Context
import { ProductsContext } from "../../contexts/ProductsContext";

//Components
import MessageModal from "../MessageModal";
import EditProductBox from "../EditProductBox";

//Material UI
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";

//Form
import { useForm, Controller, SubmitHandler } from "react-hook-form";

//Icons
import SettingsIcon from "@mui/icons-material/Settings";

//Graphql
import { gql, useMutation } from "@apollo/client";

//Types
import { IProduct } from "../../types/types";

//Constants
import { MEASURE_UNITS } from "../../constants/measureUnits";

//Styles
import { classes, Root } from "./InputProduct.style";
//Utils
import UnitsFormat from "../../utils/unitsFormat";

const UPDATE_AMOUNT = gql`
  mutation SaveAmountProduct($productId: ID!, $updatedAmount: Int!) {
    saveAmountProduct(productId: $productId, updatedAmount: $updatedAmount) {
      id
      categories {
        currentAmount
      }
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

//Types
interface IForm {
  currentAmount: string;
  selectUnit: string; //should it be enum?
}
type IProps = {
  name: string;
  currentAmount: number;
  previousAmount: number;
  id: string;
  categoryId: string;
  showAmounts: boolean;
  measureUnit: string; //duplicate?
  position: number;
  unit: string; //duplicate??
};

const InputProduct: React.FC<IProps> = ({
  name,
  currentAmount,
  previousAmount,
  id,
  categoryId,
  showAmounts,
  measureUnit,
  position,
  unit,
}) => {
  //Context
  const { products, updateProducts } = useContext(ProductsContext);

  //useState
  const [showEditProductBox, setShowEditProductBox] = useState(false);
  const [currentMeasureUnit, setCurrentMeasureUnit] = useState(measureUnit);

  const [amount, setAmount] = useState(currentAmount.toString());
  const [openMessageModal, setOpenMessageModal] = useState(false);

  //Queries
  const [saveAmountProduct, { data }] = useMutation(UPDATE_AMOUNT);
  const [saveNewUnit] = useMutation(UPDATE_UNIT);

  //React hook form
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },

    reset,
  } = useForm<IForm>();

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

  const onSubmit: SubmitHandler<IForm> = async (data) => {
    console.log(data.currentAmount);
    try {
      let response = await saveAmountProduct({
        variables: {
          productId: id,
          updatedAmount: parseInt(data.currentAmount),
        },
      });
      console.log(response);

      let newProductsList = products?.map((product: IProduct) => {
        if (product.id === id) {
          let newProduct = JSON.parse(JSON.stringify(product));
          return Object.assign(newProduct, {
            currentAmount: parseInt(data.currentAmount),
          });
        }
        return product;
      });
      if (updateProducts && newProductsList) updateProducts(newProductsList);
      setAmount(data.currentAmount.toString());
    } catch (err) {
      console.log("error");
      console.error(err);
    }
  };

  const formBody = (
    <form>
      <span className={classes.innerFormControl}>
        <Controller
          name="currentAmount"
          control={control}
          defaultValue={"0"}
          rules={{ required: true, pattern: /^[+-]?(\d*\.)?\d+$/g }}
          render={({ field }: any) => (
            <TextField
              {...field}
              id={name + "current"}
              label={"Current"}
              color="primary"
              value={field.value}
              onChange={field.onChange}
              onBlur={handleSubmit(onSubmit)}
              variant="standard"
              fullWidth
              className={classes.textfield}
            />
          )}
        />
        {errors.currentAmount?.type === "required" && <span>*Required</span>}
        {errors.currentAmount?.type === "pattern" && <span>*Not a number</span>}
      </span>
      <span className={classes.innerFormControl}>
        <Controller
          name="selectUnit"
          control={control}
          defaultValue={unit}
          rules={{ required: true }}
          render={({ field }) => (
            <Select
              {...field}
              labelId={name + "labelID-select"}
              id={name + "select"}
              onChange={(e) => {
                handleUnitChange(e.target.value);
              }}
              onBlur={handleSubmit(onSubmit)}
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
          )}
        />
      </span>
    </form>
  );

  const handleMessageModalClicked = () => {
    setOpenMessageModal(false);
  };
  const toggleShowProductBox = () => {
    setShowEditProductBox(!showEditProductBox);
  };

  const handleUnitChange = async (value: any) => {
    const newUnit = value;
    const unitsFormat = new UnitsFormat();

    let result: number | null = null;
    switch (newUnit) {
      case "l":
        result = unitsFormat.toLitre(Number(amount), currentMeasureUnit);

        break;
      case "ml":
        result = unitsFormat.toMl(Number(amount), currentMeasureUnit);

        break;
      case "kg":
        result = unitsFormat.toKg(Number(amount), currentMeasureUnit);

        break;
      case "g":
        result = unitsFormat.toGrams(Number(amount), currentMeasureUnit);

        break;
    }
    if (result === null) {
      setOpenMessageModal(true);
      setValue("currentAmount", "0");
    } else {
      setValue("currentAmount", result.toString());
    }
    setValue("selectUnit", newUnit);
    setCurrentMeasureUnit(newUnit);
  };

  const bodyWithAmount = () => (
    <Fragment>
      <FormControl
        className={classes.innerFormControl}
        data-testid="select-unit"
      >
        <InputLabel id={name + "labelID-select"}>Unit</InputLabel>
        {/* <Select
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
        </Select> */}
      </FormControl>

      <FormControl className={classes.innerFormControl}></FormControl>
    </Fragment>
  );

  return (
    <Root className={classes.root}>
      {showAmounts && <Typography variant="h6">{name}</Typography>}
      <FormControl className={classes.formControl} fullWidth>
        {!showAmounts && <Typography variant="h6">{name}</Typography>}
        {formBody}
        {/* {showAmounts && bodyWithAmount()} */}

        <Box className={classes.box} width="15%">
          <Typography variant="caption" className={classes.lastAmountName}>
            Last
          </Typography>
          <Typography align="left" className={classes.lastAmountValue}>
            {previousAmount}
          </Typography>
        </Box>
        <IconButton onClick={(e) => toggleShowProductBox()}>
          <SettingsIcon />
        </IconButton>
      </FormControl>

      <EditProductBox
        id={id}
        name={name}
        categoryId={categoryId}
        show={showEditProductBox}
        position={position}
        unit={unit}
      />
      <MessageModal
        open={openMessageModal}
        isError={false}
        message="We can't convert that value to that unit format. It will be reset to zero"
        handleClick={handleMessageModalClicked}
      />
    </Root>
  );
};

export default InputProduct;
