"use client";

//React
import React, { createContext, useContext, useState, useEffect } from "react";

//GraphQL
import { useMutation, useLazyQuery, gql } from "@apollo/client";
import { CREATE_CATEGORY, GET_CATEGORIES } from "../graphql/queries";

//Context
import { UserContext } from "./UserContext";

interface IProps {
  children: React.ReactNode;
}
interface ICategory {
  id: string;
  name: string;
}
interface IResponseDelete {
  id: string;
  name: string;
  error: string;
}
interface IContext {
  hasCategory: boolean | null;
  categories: ICategory[] | [];
  setCategories: (categories: ICategory[] | []) => void;
  createCategoryApi: (category: ICategory) => any;
  deleteCategoryApi: (category: ICategory) => any;
}

const DELETE_CATEGORY = gql`
  mutation DeleteCategory($categoryId: ID!) {
    deleteCategory(categoryId: $categoryId) {
      id
      name
      error
    }
  }
`;

const CategoriesContext = createContext<Partial<IContext>>({});

const CategoriesProvider = ({ children }: IProps) => {
  const [createCategory] = useMutation(CREATE_CATEGORY);
  const [deleteCategory] = useMutation(DELETE_CATEGORY);
  const { currentUser, loggedIn } = useContext(UserContext);
  const [hasCategory, setHasCategory] = useState<boolean | null>(null);

  //Get set by the useQuery below
  const [categories, setCategories] = useState<ICategory[] | []>([]);

  const [getCategories, { data, loading, error }] =
    useLazyQuery(GET_CATEGORIES);

  useEffect(() => {
    if (data?.categories) {
      setCategories(data.categories);
      console.log(data.categories);
      if (data.categories.length > 0) setHasCategory(true);
      else setHasCategory(false);
    }
  }, [data]);

  useEffect(() => {
    if (loggedIn) getCategories();
  }, [loggedIn, getCategories]);

  //add a new category
  async function createCategoryApi({ name }: ICategory) {
    try {
      if (currentUser === undefined) return { error: "Logout out" };
      let response = await createCategory({
        variables: { name: name, userId: currentUser.id },
      });
      console.log(response?.data?.createCategory);
      if (response?.data?.createCategory?.id) {
        // const { id as cId, name as cName } = response.data.createCategory.id;
        setCategories([
          ...categories,
          { id: response.data.createCategory.id, name },
        ]);
        setHasCategory(true);
      }
      return (
        response.data.createCategory || {
          error: "No response from the server",
        }
      );
    } catch (err: any) {
      console.log(err.message);
      return { error: err.message };
    }
  }
  //Delete a category
  async function deleteCategoryApi(category: ICategory) {
    try {
      if (category.id === undefined) return { error: "Something went wrong" };
      //response = { id, name, error}
      const response = await deleteCategory({
        variables: {
          categoryId: category.id,
        },
      });
      return (
        response.data.deleteCategory || {
          error: "No response from the server",
        }
      );
    } catch (err: any) {
      console.error(err.message);
      return { error: err.message };
    }
  }

  if (loading) return null;
  return (
    <CategoriesContext.Provider
      value={{
        hasCategory,
        categories,
        setCategories,
        createCategoryApi,
        deleteCategoryApi,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};

export { CategoriesProvider, CategoriesContext };
