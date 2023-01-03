//Create state machine workflow

//React
import React, {
  createContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  useContext,
} from "react";

//GraphQL
import { gql, useQuery, useLazyQuery } from "@apollo/client";

//Context
import { UserContext } from "./UserContext";

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

interface IContext {
  loadingStates: boolean;
}

const StatesContext = createContext<Partial<IContext>>({});

const StatesProvider = ({ children }: IProps) => {
  const { loggedIn } = useContext(UserContext);
  const [hasProduct, setHasProduct] = useState(false);
  const [loadingStates, setLoadingStates] = useState(false);

  //Need to add error handling
  //Use to refetch when user login
  const [getStates, { data, error, loading }] = useLazyQuery(GET_STATES);

  //Fetch states when user logged in
  useEffect(() => {
    if (loggedIn) getStates();
  }, [loggedIn, getStates]);
  useEffect(() => {
    if (data?.numOfProducts) {
      setHasProduct(true);
    }
  }, [data]);
  useEffect(() => {
    if (loading) setLoadingStates(true);
    else setLoadingStates(false);
  }, [loading]);
  useEffect(() => {
    console.log(`loadingStates ${loadingStates}`);
  }, [loadingStates]);

  ///display loading page
  //request amount of report, categories and products
  if (loading) return null;
  //if(error)return null;
  return (
    <StatesContext.Provider
      value={{
        loadingStates,
      }}
    >
      {children}
    </StatesContext.Provider>
  );
};

export { StatesProvider, StatesContext };
