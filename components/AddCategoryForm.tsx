//React
import React, { useState, useContext } from "react";

import { styled } from '@mui/material/styles';
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

//Form
import { useForm, Controller, SubmitHandler } from "react-hook-form";

//Context
// import { UserContext } from '../contexts/UserContext'
import { CategoriesContext } from "../contexts/CategoriesContext";

const PREFIX = 'AddCategoryForm';

const classes = {
  content: `${PREFIX}-content`,
  buttons: `${PREFIX}-buttons`,
  input: `${PREFIX}-input`
};

const StyledDialog = styled(Dialog)({
  [`& .${classes.content}`]: {
    display: "flex",
    flexDirection: "column",
  },
  [`& .${classes.buttons}`]: {
    marginTop: 5,
    display: "flex",
    justifyContent: "space-around",
  },
  [`& .${classes.input}`]: {
    display: "flex",
    flexDirection: "column",
  },
});

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

const useStyle = makeStyles({
  [`& .${classes.content}`]: {
    display: "flex",
    flexDirection: "column",
  },
  [`& .${classes.buttons}`]: {
    marginTop: 5,
    display: "flex",
    justifyContent: "space-around",
  },
  [`& .${classes.input}`]: {
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
      //Need  a category to update the states from the parent components
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
          // onClick={() => {
          //   handleCloseModal();
          // }}
        >
          Cancel
        </Button>
      </div>
    </form>
  );

  return (
    <StyledDialog
      open={open}
      aria-labelledby="Add Category Form"
      onClose={() => handleCloseModal()}
    >
      {/* <DialogTitle>Add a category</DialogTitle> */}
      <DialogContent className={classes.content}>
        {!submitting ? formBody : <CircularProgress />}
      </DialogContent>
    </StyledDialog>
  );
}

export default AddCategoryForm;
