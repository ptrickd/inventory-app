//React
import React, { useState, useContext } from "react";

//Context
import { ProductsContext } from "../contexts/ProductsContext";

//Material UI
import { makeStyles } from "@mui/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

//Form
import { useForm, Controller, SubmitHandler } from "react-hook-form";

interface IProps {
  open: boolean;
  handleCloseModal: () => void;
  categoryId: string;
}

interface IForm {
  name: string;
}

const useStyle = makeStyles({
  content: {
    display: "flex",
    flexDirection: "column",
  },
  buttons: {
    marginTop: 5,
    display: "flex",
    justifyContent: "space-around",
  },
  input: {
    display: "flex",
    flexDirection: "column",
  },
});

function AddProductForm({ open, handleCloseModal, categoryId }: IProps) {
  const classes = useStyle();
  const { addProduct } = useContext(ProductsContext);
  const [submitting, setSubmitting] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IForm>();

  const onSubmit: SubmitHandler<IForm> = async (data) => {
    setSubmitting(true);
    if (addProduct !== undefined && typeof categoryId === "string") {
      addProduct({
        name: data.name,
        currentAmount: 0,
        previousAmount: 0,
        categoryId: categoryId,
        unit: "ea",
      });
    }

    reset({ name: "" });
    setSubmitting(false);
    handleCloseModal();
  };

  const formBody = (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.input}>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <TextField {...field} label="Add a product" autoComplete="off" />
          )}
        />
        {errors.name && <span>*Required</span>}
      </div>

      <div className={classes.buttons}>
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
      <DialogContent className={classes.content}>
        {!submitting ? formBody : <CircularProgress />}
      </DialogContent>
    </Dialog>
  );
}

export default AddProductForm;
