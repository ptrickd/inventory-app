//React
import React, { createContext, useState, useEffect, useContext } from "react";

//GraphQL
import { gql, useMutation, useLazyQuery } from "@apollo/client";
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  EDIT_PRODUCT,
} from "../graphql/queries";

//Types
import {
  IProduct,
  IAddProduct,
  IProductByCategory,
  ISubCategory,
} from "../types/types";

//Context
import { UserContext } from "./UserContext";

//Lodash
import isEmpty from "lodash/isEmpty";

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
  productsByCategory: IProduct[] | [];

  updateProducts: (list: IProduct[]) => void;
  setCategoryId: (categoryId: string) => void;
  addProduct: (product: IAddProduct) => any;
  deleteProductApi: (productId: string) => void;

  editProductApi: (
    productId: string,
    productName: string,
    categoryId: string
  ) => void;
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
    console.log("productsByCategory=>");
    console.log(productsByCategory);
  }, [productsByCategory]);

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

  useEffect(() => {
    //Will be a list of formatted product by category
    let productsToReturn: IProductByCategory[] | [] = [];

    let formattedProduct: IProductByCategory = {
      name: "",
      unit: "",
      categoryId: "",
    };

    //iterate through categories find if one equal context category
    let isReturned = false;
    let categoryObj: ISubCategory = {
      currentAmount: 0,
      previousAmount: 0,
      categoryId: "",
    };

    if (contextCategoryId.length > 0) {
      //flag true if
      isReturned = false;

      //Iterate through the list of products from the backend
      products.forEach((product) => {
        console.log(product);
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
          const { currentAmount, previousAmount, categoryId } = categoryObj;
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
            };

            productsToReturn = [...productsToReturn, formattedProduct];
          }
        }
      });
      productsToReturn.map((product) => console.log(product));
      setProductsByCategory(productsToReturn);
    }
  }, [contextCategoryId, products]);

  const updateProducts = (list: IProduct[]) => {
    setProducts(list);
  };

  async function addProduct({ name, categoryId, unit }: IAddProduct) {
    try {
      let response = await createProduct({
        variables: {
          name: name,
          categoryId: categoryId,
          unit: unit,
        },
      });
      if (response.data.createProduct.id) {
        //set product here add the response to current products
        setProducts([
          ...products,
          {
            id: response.data.createProduct.id,
            name: response.data.createProduct.name,
            categories: [
              ...response.data.createProduct.categories,
              {
                categoryId: response.data.createProduct.categoryId,
              },
            ],
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
      console.log(err.message);
      return { error: err.message };
    }
  }

  const deleteProductApi = async (productId: string) => {
    await deleteProduct({ variables: { productId: productId } });

    getProducts({ variables: { categoryId: contextCategoryId } });
  };

  const editProductApi = async (
    productId: string,
    productName: string,
    categoryId: string
  ) => {
    await editProduct({
      variables: {
        productId,
        name: productName,
        categoryId,
        unit: "ea",
      },
    });
    getProducts({ variables: { categoryId: contextCategoryId } });
  };

  if (loading) return null;
  return (
    <ProductsContext.Provider
      value={{
        hasProduct,
        products,
        // productsByCategory,
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
