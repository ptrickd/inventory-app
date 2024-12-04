//React
import React, { useState, useContext } from "react";

//Material UI
import Dialog from "@mui/material/Dialog";

import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

//Form
import { useForm, Controller, SubmitHandler } from "react-hook-form";

//Context
import { CategoriesContext } from "../../contexts/CategoriesContext";

//Types
import {
  buttonsStyle,
  contentStyle,
  inputStyle,
} from "./AddCategoryForm.style";

interface ICategory {
  id: string;
  name: string;
  error: string;
}
interface IProps {
  open: boolean;
  handleCloseModal: (category?: ICategory) => void;
}

interface IForm {
  name: string;
}

function AddCategoryForm({ open, handleCloseModal }: IProps) {
  //useState
  const [submitting, setSubmitting] = useState(false);

  //React hook form
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IForm>();

  //useContext
  const { createCategoryApi } = useContext(CategoriesContext);

  const onSubmit: SubmitHandler<IForm> = async (data) => {
    if (createCategoryApi !== undefined) {
      setSubmitting(true);
      let response = await createCategoryApi({ id: "", name: data.name });
      //response = id name error
      reset({ name: "" });
      setSubmitting(false);
      //Need  a category to update the states from the parent components
      handleCloseModal(response);
    }
  };

  const formBody = (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        defaultValue=""
        rules={{ required: true }}
        render={({ field }) => (
          <TextField
            className={inputStyle}
            {...field}
            label="Add a category"
            autoComplete="off"
            type="text"
          />
        )}
      />
      {errors.name && <span>*Required</span>}

      <div className={buttonsStyle}>
        <Button variant="contained" size="small" color="primary" type="submit">
          Add
        </Button>
        <Button
          variant="contained"
          size="small"
          color="secondary"
          onClick={() => {
            handleCloseModal();
          }}
        >
          Cancel
        </Button>
      </div>
    </form>
  );

  return (
    <Dialog
      open={open}
      aria-labelledby="Add Category Form"
      onClose={() => handleCloseModal()}
    >
      {/* <DialogTitle>Add a category</DialogTitle> */}
      <DialogContent className={contentStyle}>
        {!submitting ? formBody : <CircularProgress />}
      </DialogContent>
    </Dialog>
  );
}

export default AddCategoryForm;
