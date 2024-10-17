//React
import React, { useState, useEffect, useContext } from "react";

//Context
import { ProductsContext } from "../../contexts/ProductsContext";

//Material UI
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

//Form
import { useForm, Controller, SubmitHandler } from "react-hook-form";

//Style
import { classes, StyledDialog } from "./AddProductForm.style";

interface IProps {
  open: boolean;
  handleCloseModal: (response: string) => void;
  categoryId: string;
  position: number;
}

interface IForm {
  name: string;
}

interface IFilter {}

const filter = createFilterOptions<IProduct>();

function AddProductForm({
  open,
  handleCloseModal,
  categoryId,
  position,
}: IProps) {
  //Context
  const { addProduct, products, productsByCategory } =
    useContext(ProductsContext);

  //useState
  const [submitting, setSubmitting] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  //React hook form
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IForm>({ defaultValues: { name: "" } });

  useEffect(() => {
    return () => {
      setOpenModal(false);
    };
  }, []);

  useEffect(() => {
    if (open !== undefined) setOpenModal(open);
  }, [open]);

  const onSubmit: SubmitHandler<IForm> = async (data) => {
    if (addProduct !== undefined) {
      setSubmitting(true);
      let response = await addProduct({
        name: data.name,
        currentAmount: 0,
        previousAmount: 0,
        categoryId,
        unit: "ea",
        position,
      });
      //response = id name error
      reset({ name: "" });
      setSubmitting(false);
    }
  };
  const formBody = (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        defaultValue=""
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <Box component="div">
            <Autocomplete
              className={classes.input}
              onChange={(event, value) => {
                //if newValue not from the list of products object
                if (typeof value === "string") {
                  onChange(value);
                } else if (value && value.name) {
                  //     // //if newValue from the list of products object
                  //     // Create a new value from the user input}
                  onChange(value.name);
                }
              }}
              // 	A function that determines the filtered options to be rendered on search.
              filterOptions={(options, params) => {
                const filtered = filter(options, params);

                const { inputValue } = params;

                // Suggest the creation of a new value
                const isExisting = options.some(
                  (option) => inputValue === option.name
                );
                if (
                  inputValue !== "" &&
                  !isExisting &&
                  productsByCategory !== undefined
                ) {
                  filtered.push({
                    name: `${inputValue}`,

                    categories: [
                      {
                        categoryId,
                        currentAmount: 0,
                        previousAmount: 0,
                        position: productsByCategory?.length,
                      },
                    ],
                    unit: "ea",
                  });
                }

                return filtered;
              }}
              selectOnFocus
              clearOnBlur
              handleHomeEndKeys
              id="add-product-search"
              /*
        Used to determine the string value for a given option. It's used to fill the input 
        (and the list box options if renderOption is not provided).If used in free solo mode, 
        it must accept both the type of the options and a string.*/
              getOptionLabel={(option) => {
                // Value selected with enter, right from the input
                if (typeof option === "string") {
                  return option;
                }
                // Add "xxx" option created dynamically
                if (option.name) {
                  return option.name;
                }
                // Regular option
                return option.name;
              }}
              sx={{ width: 300 }}
              options={products || []}
              renderOption={(props, option) => (
                <li {...props} key={option.name}>
                  {option.name}
                </li>
              )}
              freeSolo
              renderInput={(params) => (
                <TextField {...params} label="Add a product" />
              )}
            />
            {errors.name && <span>*Required</span>}
            <Box component={"div"} className={classes.buttons}>
              <Button
                variant="contained"
                size="small"
                color="primary"
                type="submit"
              >
                Add
              </Button>
              <Button
                variant="contained"
                size="small"
                color="secondary"
                onClick={() => {
                  handleCloseModal("");
                }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        )}
      />
    </form>
  );

  return (
    <StyledDialog
      open={openModal}
      aria-labelledby="Add Category Form"
      onClose={() => handleCloseModal("")}
    >
      <DialogContent className={classes.content}>
        {/* {!submitting ? searchBar : <CircularProgress />} */}
        {!submitting ? formBody : <CircularProgress />}
      </DialogContent>
    </StyledDialog>
  );
}

export default AddProductForm;
