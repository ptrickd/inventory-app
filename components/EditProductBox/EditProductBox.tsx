//React
import { useState, useContext } from "react";

//Components
import EditProductForm from "../EditProductForm";
import MessageModal from "../MessageModal";

//Context
import { ProductsContext } from "../../contexts/ProductsContext";

//Icons
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

//Styles
import { classes, Root } from "./EditProductBox.style";

//Types
interface IProps {
  id: string;
  name: string;
  categoryId: string;
  show: boolean;
  position: number;
}

const EditProductPart = ({ id, name, categoryId, show, position }: IProps) => {
  //useState
  const [openEditProductForm, setOpenEditProductModal] = useState(false);
  const [openMessageModal, setOpenMessageModal] = useState(false);
  const [message, setMessage] = useState("");

  //useContext
  const { deleteProductApi } = useContext(ProductsContext);

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

  //Rendering
  if (!show) return null;
  return (
    <Root className={classes.root}>
      <IconButton color="inherit" onClick={(e) => console.log("go up")}>
        <ArrowUpwardIcon />
      </IconButton>

      <IconButton color="inherit" onClick={(e) => console.log("go down")}>
        <ArrowDownwardIcon />
      </IconButton>

      <IconButton
        color="inherit"
        onClick={(e) => setOpenEditProductModal(true)}
      >
        <EditIcon />
      </IconButton>

      <IconButton color="inherit" onClick={handleClickOnDelete}>
        <DeleteIcon />
      </IconButton>

      <EditProductForm
        open={openEditProductForm}
        handleCloseModal={handleEditAddProductForm}
        productId={id}
        categoryId={categoryId}
        productName={name}
        position={position}
      />
      <MessageModal
        open={openMessageModal}
        message={message}
        isError={true}
        handleClick={handleMessageModalClicked}
      />
    </Root>
  );
};

export default EditProductPart;
