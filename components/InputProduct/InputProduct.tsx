//React
import React, { useState, useEffect, useContext } from "react";

//Context
import { ProductsContext } from "../../contexts/ProductsContext";

//Components
import MessageModal from "../MessageModal";
import EditProductBox from "../EditProductBox";

//Material UI
import { useTheme } from "@mui/material";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";

//Form
import { useForm, Controller, SubmitHandler } from "react-hook-form";

//Icons
import SettingsIcon from "@mui/icons-material/Settings";

//Graphql
import { gql, useMutation } from "@apollo/client";

//Constants
import { MEASURE_UNITS } from "../../constants/measureUnits";

//Styles
import { classes, Root } from "./InputProduct.style";

//Utils
import UnitsFormat from "../../utils/unitsFormat";

const UPDATE_AMOUNT = gql`
  mutation SaveAmountProduct(
    $productId: ID!
    $updatedAmount: Int!
    $categoryId: ID!
  ) {
    saveAmountProduct(
      productId: $productId
      updatedAmount: $updatedAmount
      categoryId: $categoryId
    ) {
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

/*
  Function help typescript convert event type from react-hook-form to event type @mui
  */
const changeData = (e: SelectChangeEvent<string>) => {
  return e as any;
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
  //Theming
  const theme = useTheme();

  //Context
  const { products, updateProducts } = useContext(ProductsContext);

  //useState
  const [showEditProductBox, setShowEditProductBox] = useState(false);

  const [openMessageModal, setOpenMessageModal] = useState(false);
  const [messageModal, setMessageModal] = useState("");
  const [currentAmountTemp, setCurrentAmountTemp] = useState<null | number>(
    null
  );

  //Queries
  const [saveAmountProduct] = useMutation(UPDATE_AMOUNT);
  const [saveNewUnit] = useMutation(UPDATE_UNIT);

  //React hook form
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<IForm>();

  // /useEffect
  useEffect(() => {
    //setCurrentAmountTemp to the current amount
    //need to loop to find first the product with the id
    //then find the currentAmount in the categories array
    if (products && id) {
      products?.forEach((product) => {
        if (product.id === id) {
          product.categories.forEach((category) => {
            if (
              category.categoryId === categoryId &&
              category.currentAmount !== undefined
            ) {
              setCurrentAmountTemp(category.currentAmount);
            }
          });
        }
      });
    }
  }, [products, id, categoryId]);

  const onSubmit: SubmitHandler<IForm> = async (data) => {
    //need to add saveNewUnit when needed
    try {
      let response = await saveAmountProduct({
        variables: {
          productId: id,
          updatedAmount: parseInt(data.currentAmount),
          categoryId: categoryId,
        },
      });

      let newProductsList = products?.map((product: IProduct) => {
        /*
        if the product id fit then:
        1. make a deep copy of the product
        2. change the the currentAmount where the categoryId fit
        3. return the product
        */
        if (product.id === id) {
          let newProduct = JSON.parse(JSON.stringify(product));

          //need to modify currentAmount field to categories
          const modifiedCategories = newProduct.categories.map(
            (category: ISubCategory) => {
              if (category.categoryId === categoryId) {
                return Object.assign(category, {
                  currentAmount: parseInt(data.currentAmount),
                });
              }
              return category;
            }
          );

          return newProduct;
        }

        return product;
      });

      if (updateProducts && newProductsList) {
        updateProducts(newProductsList);
      }
    } catch (err: any) {
      // console.error(err.message);
      if (err.message) {
        setOpenMessageModal(true);
        setMessageModal(err.message);
      }
    }
  };

  const onSubmitUnit: SubmitHandler<IForm> = async (data) => {
    try {
      let response = await saveNewUnit({
        variables: {
          productId: id,
          updatedUnit: data.selectUnit,
        },
      });

      if (products) {
        const newProductsList = products.map((product) => {
          if (product.id === id) {
            return { ...product, unit: data.selectUnit };
          } else return product;
        });
        if (updateProducts) updateProducts(newProductsList);
      }
    } catch (err: any) {
      console.error(err.message);
      if (err.message) {
        setOpenMessageModal(true);
        setMessageModal(err.message);
      }
    }
  };

  const formBody = (
    <form>
      <span className={classes.innerFormControl}>
        <Controller
          name="currentAmount"
          control={control}
          defaultValue={currentAmount?.toString()}
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
              value={field.value}
              onChange={(e) => field.onChange(changeData(e))}
              onBlur={handleSubmit(onSubmitUnit)}
              variant="standard"
              className={classes.selectUnit}
              data-testid="button"
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
      {errors.currentAmount?.type === "required" && <span>*Required</span>}
      {errors.currentAmount?.type === "pattern" && <span>*Not a number</span>}
    </form>
  );

  const handleMessageModalClicked = () => {
    setOpenMessageModal(false);
  };
  const toggleShowProductBox = () => {
    setShowEditProductBox(!showEditProductBox);
  };
  if (typeof currentAmountTemp !== "number") return null;
  return (
    <Root className={classes.root}>
      {showAmounts && <Typography variant="h6">{name}</Typography>}
      <FormControl className={classes.formControl} fullWidth>
        {!showAmounts && <Typography variant="h6">{name}</Typography>}
        {showAmounts && formBody}

        <Box className={classes.box} width="15%">
          <Typography
            variant="caption"
            className={classes.lastAmountName}
            color={theme.palette.text.primary}
          >
            Last
          </Typography>
          <Typography align="left" className={classes.lastAmountValue}>
            {previousAmount}
          </Typography>
        </Box>
        <IconButton color="icon" onClick={(e) => toggleShowProductBox()}>
          <SettingsIcon color="inherit" />
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
        message={messageModal}
        handleClick={handleMessageModalClicked}
      />
    </Root>
  );
};

export default InputProduct;
