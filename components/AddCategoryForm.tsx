//React
import React, { useState, useContext } from "react";

//Material UI
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

//Form
import { useForm, Controller, SubmitHandler } from "react-hook-form";

//Context
// import { UserContext } from '../contexts/UserContext'
import { CategoriesContext } from "../contexts/CategoriesContext";

interface ICategory {
  id: string;
  name: string;
  error: string;
}
interface IProps {
  open: boolean;
  handleCloseModal: (category: ICategory) => void;
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

function AddCategoryForm({ open, handleCloseModal }: IProps) {
  const classes = useStyle();
  const [submitting, setSubmitting] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IForm>();
  const { createCategoryApi } = useContext(CategoriesContext);

  const onSubmit: SubmitHandler<IForm> = async (data) => {
    console.log(typeof createCategoryApi);
    if (createCategoryApi !== undefined) {
      setSubmitting(true);
      let category = await createCategoryApi({ id: "", name: data.name });
      //category = id name error
      reset({ name: "" });
      setSubmitting(false);
      handleCloseModal(category);
    }
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
            <TextField {...field} label="Add a category" autoComplete="off" />
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

export default AddCategoryForm;
