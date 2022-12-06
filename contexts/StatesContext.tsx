//Create state machine workflow

//React
import React, {
  createContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";

//GraphQL
import { gql, useQuery } from "@apollo/client";

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

//Constants of the states
interface IStatesConstant {
  isLoading: string;
  hasNoReport: string;
  hasNoCategory: string;
  hasNoProduct: string;
  inNormalMode: string;
}

interface IContext {
  states: IStates;
  updateStates: (states: IStates) => void;
  STATES: IStatesConstant;
}

const StatesContext = createContext<Partial<IContext>>({});

const StatesProvider = ({ children }: IProps) => {
  //useMemo needed to deal with the useEffect dependencies
  const STATES: IStatesConstant = useMemo(() => {
    return {
      isLoading: "isLoading",
      hasNoReport: "hasNoReport",
      hasNoCategory: "hasNoCategory",
      hasNoProduct: "hasNoProduct",
      inNormalMode: "inNormalMode",
    };
  }, []);

  const [states, setStates] = useState<IStates>({
    state: "isLoading",
    report: 0,
    category: 0,
    product: 0,
  });

  //Need to add error handling
  const { data, error, loading } = useQuery(GET_STATES);
  //useCallback needed to deal with the useEffect dependencies
  const updateStates = useCallback(
    (newStates: Partial<IStates>) => {
      if (newStates.report && newStates.category && newStates.product) {
        let state: string = "";
        if (states.report === 0) state = STATES.hasNoReport;
        if (states.category === 0) state = STATES.hasNoCategory;
        if (states.product === 0) state = STATES.hasNoProduct;
        else state = STATES.inNormalMode;
        setStates({
          state: state,
          report: newStates.report,
          category: newStates.category,
          product: newStates.product,
        });
      }
    },
    [states, STATES]
  );

  useEffect(() => {
    if (data) {
      updateStates({
        report: data.numOfReports,
        category: data.numofCategory,
        product: data.numOfProduct,
      });
    }
  }, [updateStates, data]);

  ///display loading page
  //request amount of report, categories and products
  // if (loading) return null;
  //if(error)return null;
  return (
    <StatesContext.Provider
      value={{
        states,
        updateStates,
        STATES,
      }}
    >
      {children}
    </StatesContext.Provider>
  );
};

export { StatesProvider, StatesContext };
