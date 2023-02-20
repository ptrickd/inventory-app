//React
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";

//Context
import { ProductsContext } from "../../contexts/ProductsContext";
import { CategoriesContext } from "../../contexts/CategoriesContext";
import { UserContext } from "../../contexts/UserContext";

//Components
import InputProduct from "../../components/InputProduct/InputProduct";
import AddProductForm from "../../components/AddProductForm";
import EditCategoryForm from "../../components/EditCategoryForm";
import MessageModal from "../../components/MessageModal";

//Material UI
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

//Icons
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

//Types
import { IProduct, ICategory } from "../../types/types";

//Style
import { classes, Root } from "../../styles/categoryId.style";

const ProductsPage: React.FC = () => {
  //Context
  const { productsByCategory, setCategoryId } = useContext(ProductsContext);
  const { categories, deleteCategoryApi } = useContext(CategoriesContext);
  const { loggedIn } = useContext(UserContext);

  //React
  const router = useRouter();
  const { categoryId } = router.query;

  //useState
  const [currentCategory, setCurrentCategory] = useState<ICategory | null>(
    null
  );
  const [listOfProducts, setListOfProducts] = useState<IProduct[] | []>([]);

  //useState for modals
  const [openAddProductModal, setOpenAddProductModal] = useState(false);
  const [openEditCategoryModal, setOpenEditCategoryModal] = useState(false);
  const [openMessageModal, setOpenMessageModal] = useState(false);
  const [messageModal, setMessageModal] = useState("");
  const [isResponseError, setIsResponseError] = useState(false);

  useEffect(() => {
    if (!loggedIn) router.push("/");
  }, [loggedIn, router]);

  useEffect(() => {
    if (categories && setCategoryId !== undefined) {
      categories.map((category: ICategory) => {
        if (category.id === categoryId) {
          setCurrentCategory(category);
          setCategoryId(category.id);
        }
      });
    }
  }, [currentCategory, categoryId, categories, setCategoryId]);

  useEffect(() => {
    if (productsByCategory !== undefined) setListOfProducts(productsByCategory);
  }, [productsByCategory]);

  /*********************************** */
  const renderedProducts = () => {
    if (!listOfProducts) return null;

    return listOfProducts.map((product: IProduct) => {
      if (product.id != undefined) {
        return (
          <InputProduct
            key={product.id}
            name={product.name}
            currentAmount={product.currentAmount || 0}
            previousAmount={product.previousAmount || 0}
            id={product.id || ""}
            categoryId={product.categoryId}
            showAmounts={true}
            measureUnit={product.unit}
          />
        );
      }
    });
  };
  /*********************************** */

  const handleCloseAddProductForm = (response: any) => {
    setOpenAddProductModal(false);
    //handle Message from server
    //if error
    if (response?.error) {
      setOpenMessageModal(true);
      setMessageModal(response.error);
      setIsResponseError(true);
    }
  };
  const handleCloseEditCategoryForm = () => setOpenEditCategoryModal(false);
  const handleMessageModalClicked = () => {
    setOpenMessageModal(false);
    setMessageModal("");
    setIsResponseError(true);
  };

  if (!currentCategory) return null;

  return (
    <Root className={classes.root} maxWidth="xs">
      <div className={classes.title}>
        <Typography variant="h2" className={classes.titleText}>
          {currentCategory.name}
        </Typography>
        <IconButton onClick={() => setOpenEditCategoryModal(true)}>
          <EditIcon />
        </IconButton>
        <IconButton
          onClick={() => {
            if (
              currentCategory != undefined &&
              deleteCategoryApi != undefined
            ) {
              deleteCategoryApi(currentCategory);
            }
          }}
        >
          <DeleteIcon />
        </IconButton>
      </div>
      <div>
        <Typography variant="h6"></Typography>
      </div>

      <hr />
      {renderedProducts()}

      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={() => setOpenAddProductModal(true)}
      >
        Add New Product
      </Button>
      {typeof categoryId === "string" && (
        <AddProductForm
          open={openAddProductModal}
          handleCloseModal={handleCloseAddProductForm}
          categoryId={categoryId}
        />
      )}

      <EditCategoryForm
        open={openEditCategoryModal}
        handleCloseModal={handleCloseEditCategoryForm}
        category={currentCategory}
        setNewCategoryName={(name) =>
          setCurrentCategory({ ...currentCategory, name })
        }
      />
      <MessageModal
        open={openMessageModal}
        message={messageModal}
        isError={isResponseError}
        handleClick={() => handleMessageModalClicked()}
      />
    </Root>
  );
};

export default ProductsPage;
