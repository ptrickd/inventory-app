import React, { useState } from "react";

//Material UI
import { makeStyles } from "@mui/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

//Form
import { useForm, Controller, SubmitHandler } from "react-hook-form";

interface IProps {
  open: boolean;
  handleCloseModal: () => void;
  category: {
    id: string;
    name: string;
  };
  setNewCategoryName: (name: string) => void;
}

interface IForm {
  id: string;
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

function EditCategoryForm({
  open,
  handleCloseModal,
  category,
  setNewCategoryName,
}: IProps) {
  const classes = useStyle();
  const [submitting, setSubmitting] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IForm>();

  const onSubmit: SubmitHandler<IForm> = async (data) => {
    setSubmitting(true);
    await fetch(`/api/category/${category.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: data.name }),
    })
      .then((resp) => resp.json())
      .then((dataFromServer) => console.log(dataFromServer))
      .catch((err) => console.log("error:", err));
    reset({ name: "" });
    setSubmitting(false);
    setNewCategoryName(data.name);
    handleCloseModal();
  };

  const formBody = (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.input}>
        <Controller
          name="name"
          control={control}
          defaultValue={category.name}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField {...field} label="Name" autoComplete="off" />
          )}
        />
        {errors.name && <span>*Required</span>}
      </div>

      <div className={classes.buttons}>
        <Button variant="contained" size="small" color="primary" type="submit">
          Edit
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

  if (!category.name) return null;
  return (
    <Dialog
      open={open}
      aria-labelledby="Add Category Form"
      onClose={() => handleCloseModal()}
    >
      <DialogTitle>{category.name.toUpperCase()}</DialogTitle>
      <DialogContent className={classes.content}>
        {!submitting ? formBody : <CircularProgress />}
      </DialogContent>
    </Dialog>
  );
}

export default EditCategoryForm;
