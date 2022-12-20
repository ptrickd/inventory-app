//React
import React, { createContext, useContext, useState, useEffect } from "react";

//GraphQL
import { useMutation, useQuery, gql } from "@apollo/client";
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
interface IContext {
  categories: ICategory[] | [];
  createCategoryApi: (category: ICategory) => any;
  deleteCategoryApi: (category: ICategory) => void;
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
  const { currentUser } = useContext(UserContext);

  //Get set by the useQuery below
  const [categories, setCategories] = useState<ICategory[] | []>([]);

  const { data, loading, error } = useQuery(GET_CATEGORIES);

  useEffect(() => {
    if (data?.categories) {
      setCategories(data.categories);
    }
  }, [data]);

  //add a new category
  async function createCategoryApi({ name }: ICategory) {
    try {
      //   console.log("currentUser", currentUser);
      //   console.log("new category name", name);

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
  const deleteCategoryApi = async (category: ICategory) => {
    if (category.id != undefined) {
      await deleteCategory({
        variables: {
          categoryId: category.id,
        },
      });
    } else console.log("No category id passed");
  };

  if (loading) return null;
  return (
    <CategoriesContext.Provider
      value={{
        createCategoryApi,
        deleteCategoryApi,
        categories,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};

export { CategoriesProvider, CategoriesContext };
