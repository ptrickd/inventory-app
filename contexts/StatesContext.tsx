//Create state machine workflow

//React
import React, { createContext, useEffect, useState } from "react";

//GraphQL
import { gql, useLazyQuery, useQuery } from "@apollo/client";

//Queries
const GET_STATES = gql`
  query States {
    numOfReports
    numOfCategories
    numOfProducts
  }
`;

//Typescript Declaration
interface IProps {
  children: React.ReactNode;
}

interface IStates {
  state: string;
  report: number;
  category: number;
  product: number;
}

interface IContext {
  states: IStates;
  reloadStates: () => void;
}

//Case sensitive dont change
enum EStates {
  loading = "loading",
  firstReport = "fisrtCategory",
  firstCategory = "firstCategory",
  firstProduct = "firstProduct",
}

const StatesContext = createContext<Partial<IContext>>({});

const StatesProvider = ({ children }: IProps) => {
  const [states, setStates] = useState<IStates>({
    state: EStates.loading,
    report: 0,
    category: 0,
    product: 0,
  });

  const { data, error, loading } = useQuery(GET_STATES);
  const reloadStates = () => {
    if (!loading && data) {
      console.log(
        `states:\n
      report:${data.numOfReports}\n
      category:${data.numOfCategories}\n
      product:${data.numOfProducts}\n`
      );
      setStates({
        state: "",
        report: data?.numOfReports,
        category: data?.numOfCategories,
        product: data?.numOfProducts,
      });
    } else if (!loading && !data) {
      console.log("!loading && !data");
    } else {
      setStates({ ...states, state: EStates.loading });
      console.log("trying to get the states from the server");
    }
  };
  //states: loading, noReport, noCategory,
  // noProduct, normal, error

  useEffect(() => {
    console.log("in the states context");
    // reloadStates();
  }, []);

  ///display loading page
  //request amount of report, categories and products

  return (
    <StatesContext.Provider
      value={{
        states,
        reloadStates,
      }}
    >
      {children}
    </StatesContext.Provider>
  );
};

export { StatesProvider, StatesContext };
