//React
import { useState, useContext } from "react";

//Components
import EditProductForm from "../EditProductForm";
import MessageModal from "../MessageModal";

//Context
import { ProductsContext } from "../../contexts/ProductsContext";

//Material UI
import Box from "@mui/material/Box";

//Icons
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

//Styles
import { rootStyle } from "./EditProductBox.style";

//Types
interface IProps {
  id: string;
  name: string;
  categoryId: string;
  show: boolean;
  position: number;
  unit: string;
}

const EditProductPart = ({
  id,
  name,
  categoryId,
  show,
  position,
  unit,
}: IProps) => {
  //useState
  const [openEditProductForm, setOpenEditProductModal] = useState(false);
  const [openMessageModal, setOpenMessageModal] = useState(false);
  const [message, setMessage] = useState("");

  //useContext
  const { productsByCategory, editProductApi, deleteProductApi } =
    useContext(ProductsContext);

  //Function
  const handleEditAddProductForm = () => setOpenEditProductModal(false);

  const handleClickOnDelete = async () => {
    let response: { id?: string; error?: string };
    if (deleteProductApi !== undefined) {
      response = await deleteProductApi(id);
      if (response && response.error) {
        setOpenMessageModal(true);
        setMessage(response.error);
      }
    }
  };

  const handleMessageModalClicked = () => setOpenMessageModal(false);

  const handleArrowUpwardClicked = async () => {
    //define position

    const newPositionCurrentProduct = position - 1;
    const newPositionPreviousProduct = position;
    const positionPreviousProduct = position - 1;

    if (
      position > 0 &&
      productsByCategory !== undefined &&
      editProductApi !== undefined
    ) {
      //find previous product
      const previousProduct = productsByCategory.filter((product) => {
        if (positionPreviousProduct === product.position) {
          return product;
        }
      });
      let response1;
      //update position previous product
      if (previousProduct.length > 0) {
        response1 = await editProductApi(
          previousProduct[0].id || "",
          previousProduct[0].name,
          previousProduct[0].categoryId,
          previousProduct[0].unit,
          newPositionPreviousProduct
        );
        //update position current product
        const response2 = await editProductApi(
          id,
          name,
          categoryId,
          unit,
          newPositionCurrentProduct
        );
      }
    }
  };

  const handleArrowDownwardClicked = async () => {
    //define position
    const newPositionCurrentProduct = position + 1;
    const newPositionNextProduct = position;
    const positionNextProduct = position + 1;
    //find next product
    if (
      productsByCategory !== undefined &&
      productsByCategory?.length !== undefined &&
      position < productsByCategory?.length &&
      editProductApi !== undefined
    ) {
      const nextProduct = productsByCategory.filter((product) => {
        if (product.position === positionNextProduct) return product;
      });
      //update next product
      if (nextProduct.length > 0) {
        const response1 = await editProductApi(
          nextProduct[0].id || "",
          nextProduct[0].name,
          nextProduct[0].categoryId,
          nextProduct[0].unit,
          newPositionNextProduct
        );
        //update current product
        const response2 = await editProductApi(
          id,
          name,
          categoryId,
          unit,
          newPositionCurrentProduct
        );

        console.log(response1);
        console.log(response2);
      }
    }
  };

  //Rendering
  if (!show) return null;
  return (
    <Box component="section" className={rootStyle}>
      <IconButton color="icon" onClick={handleArrowUpwardClicked}>
        <ArrowUpwardIcon titleAccess="arrow-up" />
      </IconButton>

      <IconButton color="icon" onClick={handleArrowDownwardClicked}>
        <ArrowDownwardIcon titleAccess="arrow-down" />
      </IconButton>

      <IconButton color="icon" onClick={(e) => setOpenEditProductModal(true)}>
        <EditIcon titleAccess="edit-icon" />
      </IconButton>

      <IconButton color="icon" onClick={handleClickOnDelete}>
        <DeleteIcon titleAccess="delete-icon" />
      </IconButton>

      <EditProductForm
        open={openEditProductForm}
        handleCloseModal={handleEditAddProductForm}
        productId={id}
        categoryId={categoryId}
        productName={name}
        position={position}
        unit={unit}
      />
      <MessageModal
        open={openMessageModal}
        message={message}
        isError={true}
        handleClick={handleMessageModalClicked}
      />
    </Box>
  );
};

export default EditProductPart;
