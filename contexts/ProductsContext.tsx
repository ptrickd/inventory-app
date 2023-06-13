//React
import React, { createContext, useState, useEffect, useContext } from "react";

//GraphQL
import { gql, useMutation, useLazyQuery } from "@apollo/client";
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  EDIT_PRODUCT,
} from "../graphql/queries";

//Context
import { UserContext } from "./UserContext";

//Queries
const GET_PRODUCTS = gql`
  query Product {
    products {
      id
      name
      categories {
        currentAmount
        previousAmount
        categoryId
        position
      }
      unit
      error
    }
  }
`;
interface IProps {
  children: React.ReactNode;
}

interface IContext {
  hasProduct: boolean | null;
  products: IProduct[];
  productsByCategory: IProductByCategory[] | [];

  updateProducts: (list: IProduct[]) => void;
  setCategoryId: (categoryId: string) => void;
  addProduct: (product: IAddProduct) => any;
  deleteProductApi: (productId: string) => any;

  editProductApi: (
    productId: string,
    productName: string,
    categoryId: string,
    unit: string,
    position: number
  ) => any;
}

const ProductsContext = createContext<Partial<IContext>>({});

const ProductsProvider = ({ children }: IProps) => {
  //Context
  const { loggedIn } = useContext(UserContext);

  //useState
  const [contextCategoryId, setCategoryId]: [
    string,
    (categoryId: string) => void
  ] = useState("");

  const [productsByCategory, setProductsByCategory] = useState<
    IProductByCategory[] | []
  >([]);

  const [products, setProducts] = useState<IProduct[] | []>([]);
  const [hasProduct, setHasProduct] = useState<boolean | null>(null);

  // /GraphQL
  const [getProducts, { data, loading }] = useLazyQuery(GET_PRODUCTS);
  const [createProduct] = useMutation(CREATE_PRODUCT);
  const [deleteProduct] = useMutation(DELETE_PRODUCT);
  const [editProduct] = useMutation(EDIT_PRODUCT);

  useEffect(() => {
    if (loggedIn) getProducts();
  }, [getProducts, loggedIn]);

  useEffect(() => {
    if (data) {
      if (data.products.length > 0) setHasProduct(true);
      else setHasProduct(false);
      setProducts(data.products);
    }
  }, [data]);

  //useEffect handle the productsByCategory value
  useEffect(() => {
    //Will be a list of formatted product by category
    let productsToReturn: IProductByCategory[] | [] = [];

    let formattedProduct: IProductByCategory = {
      name: "",
      unit: "",
      categoryId: "",
      position: -1,
    };

    //iterate through categories find if one equal context category
    let isReturned = false;
    let categoryObj: ISubCategory = {
      currentAmount: 0,
      previousAmount: 0,
      categoryId: "",
      position: -1,
    };

    if (contextCategoryId.length > 0) {
      //flag true if
      isReturned = false;

      //Iterate through the list of products from the backend
      products.forEach((product) => {
        //Verify if the product is the current context category
        product?.categories.map((category) => {
          //If the current category is present, flag the product
          if (category.categoryId === contextCategoryId) {
            isReturned = true;
            categoryObj = category;
          }
        });

        if (isReturned) {
          //Destructure product
          const { id, name, unit } = product;
          const { currentAmount, previousAmount, categoryId, position } =
            categoryObj;
          if (
            id !== undefined &&
            name !== undefined &&
            unit !== undefined &&
            currentAmount !== undefined &&
            previousAmount !== undefined &&
            categoryId !== undefined
          ) {
            //Copy values in a new object
            formattedProduct = {
              id: id,
              name: name,
              unit: unit,
              currentAmount: currentAmount,
              previousAmount: previousAmount,
              categoryId: categoryId,
              position: position,
            };

            productsToReturn = [...productsToReturn, formattedProduct];
          }
        }
        isReturned = false;
      });

      //sort object  with the position value
      const sortedProductsToReturn = productsToReturn.sort((a, b) => {
        return a.position - b.position;
      });
      setProductsByCategory(sortedProductsToReturn);
    }
  }, [contextCategoryId, products]);

  const updateProducts = (list: IProduct[]) => {
    setProducts(list);
  };

  async function addProduct({ name, categoryId, unit, position }: IAddProduct) {
    try {
      let response = await createProduct({
        variables: {
          name: name,
          categoryId: categoryId,
          unit: unit,
          position: position,
        },
      });
      if (response.data.createProduct.id) {
        //set product here add the response to current products
        setProducts([
          ...products,
          {
            id: response.data.createProduct.id,
            name: response.data.createProduct.name,
            categories: [...response.data.createProduct.categories],
            unit: response.data.createProduct.unit,
          },
        ]);
        setHasProduct(true);
      }

      if (response) return response.data.createProduct;
      else
        return {
          error: "No response from the server.",
        };
    } catch (err: any) {
      console.error(err.message);
      return { error: err.message };
    }
  }

  async function deleteProductApi(productId: string) {
    try {
      const response = await deleteProduct({
        variables: { productId: productId },
      });

      const { id, error } = response.data.deleteProduct;
      if (id) {
        //handle the removal from local list products

        const newProductsList = products.filter((product) => {
          if (product.id !== id) return product;
        });
        setProducts(newProductsList);
        return { id: id };
      } else if (error) {
        //display an error message
        console.error(error);
        return { error: error };
      }
    } catch (err: any) {
      //display an error message
      console.error(err.message);
      return { error: err.message };
    }
  }

  async function editProductApi(
    productId: string,
    productName: string,
    categoryId: string,
    unit: string,
    position: number
  ) {
    try {
      const response = await editProduct({
        variables: {
          productId,
          name: productName,
          categoryId,
          unit,
          position,
        },
      });

      return { data: response.data.editProduct };
    } catch (err: any) {
      console.error(err.message);
      return { error: err.message };
    }
  }

  //Rendering
  if (loading) return null;
  return (
    <ProductsContext.Provider
      value={{
        hasProduct,
        products,
        productsByCategory,
        updateProducts,
        setCategoryId,
        addProduct,
        deleteProductApi,
        editProductApi,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export { ProductsProvider, ProductsContext };
