//Create state machine workflow
//when first start with no categories
//when first dateendingcycle but no categories
//when categories and products

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

interface IProps {
  children: React.ReactNode;
}

// interface IStates {
//   state: string;
//   report: number;
//   category: number;
//   product: number;
// }

interface IContext {
  states: string;
}

const StatesContext = createContext<Partial<IContext>>({});

const StatesProvider = ({ children }: IProps) => {
  // const [states, setStates] = useState<IStates>({
  //   state: "loading",
  //   report: 0,
  //   category: 0,
  //   product: 0,
  // });
  const states = "loading";
  useEffect(() => {
    console.log(states);
  }, []);
  // const { data, error, loading } = useQuery(GET_STATES);
  //states: loading, noReport, noCategory,
  // noProduct, normal, error

  // useEffect(() => {
  //   console.log("in the states context");
  //   if (!loading && data) {
  //     console.log(
  //       `states:\n
  //     report:${data.numOfReports}\n
  //     category:${data.numOfCategories}\n
  //     product:${data.numOfReports}\n`
  //     );
  //     states.state = "";
  //     states.report = data?.numOfReports;
  //     states.category = data?.numOfCategories;
  //     states.product = data?.numOfProducts;
  //   } else if (!loading && !data) {
  //     console.log("not loading and not data");
  //   } else {
  //     console.log("trying to get the states from the server");
  //   }
  // }, [loading]);

  ///display loading page
  //request amount of report, categories and products

  return (
    <StatesContext.Provider
      value={{
        states,
      }}
    >
      {children}
    </StatesContext.Provider>
  );
};

export { StatesProvider, StatesContext };
