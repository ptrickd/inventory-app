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

// interface IUpdateStates {
//   currentStates: IStates;
//   newStates: Partial<IStates>;
// }

interface IContext {
  hasReport: boolean;
  setHasReport: (hasReport: boolean) => void;
  hasCategory: boolean;
  setHasCategory: (hasCategory: boolean) => void;
  hasProduct: boolean;
  setHasProduct: (hasProduct: boolean) => void;
}
// states: IStates;
// updateStates: (currentStates: IStates, newStates: Partial<IStates>) => void;
// STATES: IStatesConstant;

const StatesContext = createContext<Partial<IContext>>({});

const StatesProvider = ({ children }: IProps) => {
  const [state, setState] = useState("isLoading");
  const [hasReport, setHasReport] = useState(false);
  const [hasCategory, setHasCategory] = useState(false);
  const [hasProduct, setHasProduct] = useState(false);

  //Need to add error handling
  const { data, error, loading } = useQuery(GET_STATES);

  useEffect(() => {
    if (data?.numOfReports) {
      setHasReport(true);
    }
    if (data?.numOfCategories) {
      setHasCategory(true);
    }
    if (data?.numOfProducts) {
      setHasProduct(true);
    }
  }, [data]);

  ///display loading page
  //request amount of report, categories and products
  if (loading) return null;
  //if(error)return null;
  return (
    <StatesContext.Provider
      value={{
        hasReport,
        setHasReport,
        hasCategory,
        setHasCategory,
        hasProduct,
        setHasProduct,
      }}
    >
      {children}
    </StatesContext.Provider>
  );
};

export { StatesProvider, StatesContext };

//useMemo needed to deal with the useEffect dependencies
// const STATES: IStatesConstant = useMemo(() => {
//   return {
//     isLoading: "isLoading",
//     hasNoReport: "hasNoReport",
//     hasNoCategory: "hasNoCategory",
//     hasNoProduct: "hasNoProduct",
//     inNormalMode: "inNormalMode",
//   };
// }, []);

// const [states, setStates] = useState<IStates>({
//   state: "isLoading",
//   report: 0,
//   category: 0,
//   product: 0,
// });

//useCallback needed to deal with the useEffect dependencies
// const updateStates = useCallback(
//   (currentStates: IStates, newStates: Partial<IStates>) => {
//     console.log(`&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&`);
//     console.log(`newStates.report :   ${newStates.report}`);
//     console.log(`newStates.category : ${newStates.category}`);
//     console.log(`newStates.product :  ${newStates.product}`);
//     console.log(`&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&`);

//     if (
//       newStates.report !== undefined &&
//       newStates.category !== undefined &&
//       newStates.product !== undefined
//     ) {
//       if (newStates.report === 0) {
//         setStates({ ...currentStates, state: STATES.hasNoReport, report: 1 });
//       } else if (newStates.category === 0) {
//         setStates({
//           ...currentStates,
//           state: STATES.hasNoCategory,
//           category: 1,
//         });
//       } else if (newStates.product === 0) {
//         setStates({
//           ...currentStates,
//           state: STATES.hasNoProduct,
//           product: 1,
//         });
//       } else {
//         setStates({ ...currentStates, state: STATES.inNormalMode });
//       }
//     }
//   },
//   [STATES]
// );
