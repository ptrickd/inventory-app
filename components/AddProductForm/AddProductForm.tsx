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

//Types
import { IProduct } from "../../types/types";

//Style
import { classes, StyledDialog } from "./AddProductForm.style";

interface IProps {
  open: boolean;
  handleCloseModal: (response: string) => void;
  categoryId: string;
}

interface IForm {
  name: string;
}

interface IFilter {}

const filter = createFilterOptions<IProduct>();

function AddProductForm({ open, handleCloseModal, categoryId }: IProps) {
  //Context
  const { addProduct, products } = useContext(ProductsContext);

  //useState
  const [submitting, setSubmitting] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    console.log(inputValue);
  }, [inputValue]);

  useEffect(() => {
    return () => {
      setOpenModal(false);
    };
  }, []);

  useEffect(() => {
    if (open !== undefined) setOpenModal(open);
  }, [open]);

  const handleSubmitNewProduct = async () => {
    setSubmitting(true);
    if (
      addProduct !== undefined &&
      typeof categoryId === "string" &&
      inputValue !== ""
    ) {
      //response id name error
      const response = await addProduct({
        name: inputValue,
        currentAmount: 0,
        previousAmount: 0,
        categoryId: categoryId,
        unit: "ea",
      });

      setInputValue("");
      setSubmitting(false);

      //Need to handle the response send back to
      if (response) handleCloseModal(response);
      else handleCloseModal("");
    }
  };

  const searchBar = (
    <Box component="div">
      <Autocomplete
        className={classes.input}
        value={inputValue}
        onChange={(event, newValue) => {
          //if newValue not from the list of products object
          if (typeof newValue === "string") {
            setInputValue(newValue);
          } else if (newValue && newValue.name) {
            // //if newValue from the list of products object
            // Create a new value from the user input
            setInputValue(newValue.name);
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
          if (inputValue !== "" && !isExisting) {
            filtered.push({
              name: `${inputValue}`,
              categoryId: categoryId,
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
        renderOption={(props, option) => <li {...props}>{option.name}</li>}
        freeSolo
        renderInput={(params) => (
          <TextField {...params} label="Add a product" />
        )}
      />

      <Box component="div" className={classes.buttons}>
        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={() => handleSubmitNewProduct()}
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
  );

  return (
    <StyledDialog
      open={openModal}
      aria-labelledby="Add Category Form"
      onClose={() => handleCloseModal("")}
    >
      {/* <DialogTitle>Add a category</DialogTitle> */}
      <DialogContent className={classes.content}>
        {!submitting ? searchBar : <CircularProgress />}
      </DialogContent>
    </StyledDialog>
  );
}

export default AddProductForm;

// const onSubmit: SubmitHandler<IForm> = async (data) => {
//   setSubmitting(true);
//   if (addProduct !== undefined && typeof categoryId === "string") {
//     //response id name error
//     const response = await addProduct({
//       name: data.name,
//       currentAmount: 0,
//       previousAmount: 0,
//       categoryId: categoryId,
//       unit: "ea",
//     });

//     reset({ name: "" });
//     setSubmitting(false);
//     if (response.error) handleCloseModal(response.error);
//     else handleCloseModal("");
//   }
// };

// const formBody = (
//   <form onSubmit={handleSubmit(onSubmit)}>
//     <div className={classes.input}>
//       <Controller
//         name="name"
//         control={control}
//         defaultValue=""
//         rules={{ required: true }}
//         render={({ field }) => <InputSearch />}
//       />
//       {errors.name && <span>*Required</span>}
//     </div>
//     <div className={classes.buttons}>
//       <Button variant="contained" size="small" color="primary" type="submit">
//         Add
//       </Button>
//       <Button
//         variant="contained"
//         size="small"
//         color="secondary"
//         onClick={() => {
//           handleCloseModal("");
//         }}
//       >
//         Cancel
//       </Button>
//     </div>
//   </form>
// );
