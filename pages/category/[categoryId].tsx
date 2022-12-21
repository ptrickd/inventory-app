//React
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";

//Context
import { ProductsContext } from "../../contexts/ProductsContext";
import { CategoriesContext } from "../../contexts/CategoriesContext";
import { UserContext } from "../../contexts/UserContext";

//Components
import InputProduct from "../../components/InputProduct";
import AddProductForm from "../../components/AddProductForm";
import EditCategoryForm from "../../components/EditCategoryForm";

//Material UI
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { makeStyles, Theme, createStyles } from "@mui/styles";

//Icons
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

//Time
import { DateTime } from "luxon";

//Types
import { IProduct, ICategory } from "../../types/types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: 60,
      marginLeft: 8,
      marginRight: 8,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    button: {
      marginTop: "10px",
    },
    title: {
      marginTop: 12,
      display: "flex",
    },
    titleText: {
      marginRight: 10,
    },
    productContainer: {
      flexGrow: 1,
    },
  })
);

const ProductsPage: React.FC = () => {
  const { productsByCategory, setCategoryId } = useContext(ProductsContext);
  const { categories, deleteCategoryApi } = useContext(CategoriesContext);
  const { loggedIn } = useContext(UserContext);
  const classes = useStyles();
  const router = useRouter();
  const { categoryId } = router.query;
  const [currentCategory, setCurrentCategory] = useState<ICategory | null>(
    null
  );

  const [openAddProductModal, setOpenAddProductModal] = useState(false);
  const [openEditCategoryModal, setOpenEditCategoryModal] = useState(false);

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

  /*********************************** */
  const renderedProducts = () => {
    let products: IProduct[] | [] = [];
    if (productsByCategory !== undefined) {
      products = productsByCategory();
    }

    if (!products) return null;
    console.log("product: ", products[0]);

    return products.map((product: IProduct) => {
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

  const handleCloseAddProductForm = () => setOpenAddProductModal(false);
  const handleCloseEditCategoryForm = () => setOpenEditCategoryModal(false);

  if (!currentCategory) return null;

  return (
    <div className={classes.root}>
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
    </div>
  );
};

export default ProductsPage;
