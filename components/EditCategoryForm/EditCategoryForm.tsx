//React
import React, { useState, useContext } from "react";

//GraphQL
import { useMutation, gql } from "@apollo/client";

//Material UI
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

//Form
import { useForm, Controller, SubmitHandler } from "react-hook-form";

//Context
import { CategoriesContext } from "../../contexts/CategoriesContext";

//Queries
//Edit categories  editCategory(categoryId: ID, name: String): Category
const EDIT_CATEGORY = gql`
  mutation EditCategory($categoryId: ID!, $name: String!) {
    editCategory(categoryId: $categoryId, name: $name) {
      name
      error
    }
  }
`;

//Types
import { classes, StyledDialog } from "./EditCategoryForm.style";

interface IProps {
  open: boolean;
  handleCloseModal: () => void;
  category: {
    id: string;
    name: string;
  };
}

interface IForm {
  id: string;
  name: string;
}

function EditCategoryForm({ open, handleCloseModal, category }: IProps) {
  //useState
  const [submitting, setSubmitting] = useState(false);
  //queries
  const [editCategory] = useMutation(EDIT_CATEGORY);
  //useContext
  const { categories, setCategories } = useContext(CategoriesContext);
  //form
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IForm>();

  const onSubmit: SubmitHandler<IForm> = async (data) => {
    setSubmitting(true);
    const response = await editCategory({
      variables: { categoryId: category.id, name: data.name },
    });

    reset({ name: "" });
    setSubmitting(false);

    const editedCategory = response.data.editCategory;
    console.log(editedCategory);
    //update the category
    if (
      categories !== undefined &&
      setCategories !== undefined &&
      editedCategory.error === null
    ) {
      const newCategories = categories.filter(({ name, id }) => {
        if (id === category.id) {
          return { id, name: data.name };
        } else {
          return { id, name };
        }
      });
      console.log(newCategories);
      setCategories(newCategories);
    }

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
    <StyledDialog
      open={open}
      aria-labelledby="Add Category Form"
      onClose={() => handleCloseModal()}
    >
      <DialogTitle>{category.name.toUpperCase()}</DialogTitle>
      <DialogContent className={classes.content}>
        {!submitting ? formBody : <CircularProgress />}
      </DialogContent>
    </StyledDialog>
  );
}

export default EditCategoryForm;
