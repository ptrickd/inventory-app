//Create state machine workflow
//when first start with no categories
//when first dateendingcycle but no categories
//when categories and products

//React
import React, { createContext, useContext, useEffect } from "react";

//GraphQL
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { UserContext } from "./UserContext";

//Queries
const GET_STATES = gql`
  query States {
    numOfReports
    numOfCategories
    numOfProducts
  }
`;

interface IStates {
  state: string;
  report: number;
  category: number;
  product: number;
}

interface IContext {
  states: IStates;
}

const StatesContext = createContext<Partial<IContext>>({});

const StatesProvider = () => {
  // const { currentUser } = useContext(UserContext);
  const { data, error, loading } = useQuery(GET_STATES);
  //states: loading, noReport, noCategory,
  // noProduct, normal, error
  const machine: IStates = {
    state: "loading",
    report: 0,
    category: 0,
    product: 0,
  };
  useEffect(() => {
    console.log("in the states context");
    if (!loading) {
      console.log(
        `states:\n
      report:${data.numOfReports}\n
      category:${data.numOfCategories}\n
      product:${data.numOfReports}\n`
      );
    } else {
      console.log("trying to get the states from the server");
    }
  }, [loading]);

  ///display loading page
  //request amount of report, categories and products

  const states = machine;
  if (loading) return null;

  return (
    <StatesContext.Provider
      value={{
        states,
      }}
    ></StatesContext.Provider>
  );
};

export { StatesProvider, StatesContext };
