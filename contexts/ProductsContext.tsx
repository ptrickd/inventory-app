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
import { IProduct, IAddProduct } from "../types/types";

//Queries
const GET_PRODUCTS = gql`
  query Product {
    products {
      id
      name
      currentAmount
      previousAmount
      categoryId
      unit
      error
    }
  }
`;
interface IProps {
  children: React.ReactNode;
}

interface IContext {
  hasProduct: boolean;

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
  const [contextCategoryId, setCategoryId]: [
    string,
    (categoryId: string) => void
  ] = useState("");
  const [productsByCategory, setProductsByCategory] = useState<IProduct[] | []>(
    []
  );
  const [products, setProducts] = useState<IProduct[] | []>([]);
  const [hasProduct, setHasProduct] = useState(false);
  const [getProducts, { data, loading }] = useLazyQuery(GET_PRODUCTS);
  const [createProduct] = useMutation(CREATE_PRODUCT);
  const [deleteProduct] = useMutation(DELETE_PRODUCT);
  const [editProduct] = useMutation(EDIT_PRODUCT);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  useEffect(() => {
    if (data) {
      if (data.products.length > 0) setHasProduct(true);

      setProducts(data.products);
    }
  }, [data]);

  useEffect(() => {
    let productsToReturn: IProduct[] | [] = [];
    if (contextCategoryId.length > 0) {
      productsToReturn = products.filter(
        (product) => product.categoryId === contextCategoryId
      );
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
            categoryId: response.data.createProduct.categoryId,
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
