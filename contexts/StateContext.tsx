//Create state machine workflow
//when first start with no categories
//when first dateendingcycle but no categories
//when categories and products

//React
import React, { createContext, useContext } from "react";

//GraphQL
import { gql } from "@apollo/client";

//Queries
const GET_STATES = gql`
  query States {
    states {
      id
      numOfReports
      numOfCategories
      numOfProducts
    }
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
  //states: loading, noReport, noCategory,
  // noProduct, normal, error
  const machine: IStates = {
    state: "loading",
    report: 0,
    category: 0,
    product: 0,
  };

  ///display loading page
  //request amount of report, categories and products
  const loading = true;
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
