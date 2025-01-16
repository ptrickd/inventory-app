"use client";

//React
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";

//Context
import { ProductsContext } from "../../../contexts/ProductsContext";
import { CategoriesContext } from "../../../contexts/CategoriesContext";
import { UserContext } from "../../../contexts/UserContext";

//Components
import InputProduct from "../../../components/InputProduct/InputProduct";
import AddProductForm from "../../../components/AddProductForm";
import EditCategoryForm from "../../../components/EditCategoryForm";
import MessageModal from "../../../components/MessageModal";

//Material UI
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

//Icons
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

//Style
import {
  buttonStyle,
  rootStyle,
  titleStyle,
  titleTextStyle,
} from "../../../styles/categoryId.style";

const ProductsPage = ({ params }: { params: { categoryId: string } }) => {
  //Context
  const { productsByCategory, setCategoryId } = useContext(ProductsContext);
  const { categories, setCategories, deleteCategoryApi } =
    useContext(CategoriesContext);
  const { loggedIn } = useContext(UserContext);

  //React
  const router = useRouter();
  const { categoryId } = params;
  //   const { categoryId } = router.query;

  //useState
  const [currentCategory, setCurrentCategory] = useState<ICategory | null>(
    null
  );
  const [listOfProducts, setListOfProducts] = useState<
    IProductByCategory[] | []
  >([]);

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
    if (productsByCategory !== undefined)
      setListOfProducts([...productsByCategory]);
    else setListOfProducts([]);
  }, [productsByCategory]);

  /*********************************** */
  const renderedProducts = () => {
    if (!listOfProducts) return null;

    return listOfProducts.map((product: IProductByCategory) => {
      if (product.id !== undefined) {
        return (
          <InputProduct
            id={product.id}
            key={product.id}
            name={product.name}
            currentAmount={product.currentAmount || 0}
            previousAmount={product.previousAmount || 0}
            categoryId={product.categoryId}
            showAmounts={true}
            measureUnit={product.unit}
            position={product.position}
            unit={product.unit}
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

  const handleDeleteIconClicked = async () => {
    try {
      if (
        currentCategory === undefined ||
        currentCategory === null ||
        deleteCategoryApi === undefined
      ) {
        throw new Error(
          "An error happened while trying to delete the category"
        );
      }
      const response = await deleteCategoryApi(currentCategory);
      //depending on the response display confirmation or error message
      if (response.error) {
        throw new Error(response.error);
      } else {
        //delete the category from the list in context

        let newCategoryList = categories?.filter(
          (category) => category.id !== currentCategory.id
        );
        if (
          setCategories !== undefined &&
          newCategoryList !== undefined &&
          categories !== undefined
        ) {
          setCategories(newCategoryList);
          //if list not empty go to the next category
          if (newCategoryList?.length > 0) {
            const path = `/category/${newCategoryList[0].id}`;

            router.push(path);
          }
          //else go to dashboard
          else router.push("/dashboard");
        }
      }
    } catch (err: any) {
      if (typeof err === "string") {
        setMessageModal(err);
        console.error(err);
      } else {
        setMessageModal(err.message);
        // console.log(err.message);
      }
      setIsResponseError(true);
      setOpenMessageModal(true);
    }
  };

  const goToNextCategory = () => {
    if (categories && categories?.length > 1) {
      let currentIndex = -1;

      categories.map((category, index) => {
        if (category.id === categoryId) currentIndex = index;
      });

      let nextIndex: number = -1;
      if (categories.length > currentIndex + 1) nextIndex = currentIndex + 1;
      else nextIndex = 0;

      router.push(categories[nextIndex].id);
    }
  };

  if (!currentCategory) return null;

  return (
    <Container className={rootStyle} maxWidth="xs">
      <div className={titleStyle}>
        <Typography variant="h2" className={titleTextStyle}>
          {currentCategory.name}
        </Typography>
        <IconButton color="icon" onClick={() => setOpenEditCategoryModal(true)}>
          <EditIcon />
        </IconButton>
        <IconButton color="icon" onClick={handleDeleteIconClicked}>
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
        className={buttonStyle}
        onClick={() => goToNextCategory()}
      >
        Next Category
      </Button>
      <Button
        variant="contained"
        color="primary"
        className={buttonStyle}
        onClick={() => setOpenAddProductModal(true)}
      >
        Add New Product
      </Button>
      {/* {typeof categoryId === "string" && (
        <AddProductForm
          open={openAddProductModal}
          handleCloseModal={handleCloseAddProductForm}
          categoryId={categoryId}
          position={listOfProducts.length}
        />
      )} */}

      {/* <EditCategoryForm
        open={openEditCategoryModal}
        handleCloseModal={handleCloseEditCategoryForm}
        category={currentCategory}
      />
      <MessageModal
        open={openMessageModal}
        message={messageModal}
        isError={isResponseError}
        handleClick={() => handleMessageModalClicked()}
      /> */}
    </Container>
  );
};

export default ProductsPage;
