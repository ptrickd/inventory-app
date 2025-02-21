//React
import React, { useState, useContext, Fragment } from "react";

//Context
import { ProductsContext } from "../../contexts/ProductsContext";
import { UserContext } from "../../contexts/UserContext";

//Material UI
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

//Form
import { useForm, Controller, SubmitHandler } from "react-hook-form";

//GraphQL
import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "../../graphql/queries";

//Styles
import {
  contentStyle,
  buttonStyle,
  inputStyle,
  categoryStyle,
} from "./EditProductForm.style";

//Types
interface ICategory {
  id: string;
  name: string;
}

interface IProps {
  open: boolean;
  handleCloseModal: () => void;
  categoryId: string;
  productName: string;
  productId: string;
  position: number;
  unit: string;
}

interface IForm {
  name: string;
  categoryId: string;
  unit: string;
}

/*
  Function help typescript convert event type from react-hook-form to event type @mui
  */
const changeData = (e: SelectChangeEvent<string>) => {
  return e as any;
};

function EditProductForm({
  open,
  handleCloseModal,
  categoryId,
  productName,
  productId,
  position,
  unit,
}: IProps) {
  const { editProductApi } = useContext(ProductsContext);
  const { currentUser } = useContext(UserContext);
  const [submitting, setSubmitting] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IForm>();

  const { data, loading, error } = useQuery(GET_CATEGORIES, {
    variables: { userId: currentUser?.id },
    skip: !currentUser,
  });

  const onSubmit: SubmitHandler<IForm> = async (data) => {
    if (editProductApi !== undefined && typeof categoryId === "string") {
      setSubmitting(true);
      console.log(data);
      editProductApi(productId, data.name, data.categoryId, unit, position);

      // reset({ name: '', categoryId: '' })
      setSubmitting(false);
      handleCloseModal();
    }
  };

  const formBody = (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={inputStyle}>
        <Controller
          name="name"
          control={control}
          defaultValue={productName}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField {...field} label="Name" autoComplete="off" />
          )}
        />
        {errors.name && <span>*Required</span>}
        <Controller
          name="categoryId"
          control={control}
          defaultValue={categoryId}
          rules={{ required: true }}
          render={({ field }) => (
            <Fragment>
              <InputLabel className={categoryStyle}>Category</InputLabel>
              <Select
                {...field}
                onChange={(e) => field.onChange(changeData(e))}
                value={field.value}
                label="Category"
                autoComplete="off"
              >
                {data.categories.map((category: ICategory) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </Fragment>
          )}
        />
      </div>

      <div className={buttonStyle}>
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

  if (loading)
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  if (error) <div>`Error! ${error.message}`</div>;

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

export default EditProductForm;
