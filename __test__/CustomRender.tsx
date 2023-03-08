//Testing library
import { render, RenderOptions } from "@testing-library/react";

//Mocked Router
import { MockedProvider } from "@apollo/client/testing";
import { mockedRouter } from "./mockedRouter";
import { RouterContext } from "next/dist/shared/lib/router-context";

//Context
import { UserContext } from "../contexts/UserContext";
import { ReportsContext } from "../contexts/ReportsContext";
import { CategoriesContext } from "../contexts/CategoriesContext";
import { ProductsContext } from "../contexts/ProductsContext";

//ContextProps
import {
  CategoriesContextProps,
  ProductsContextProps,
  UserContextProps,
  ReportsContextProps,
} from "./mockedContexts";

//Queries
import { LOGIN } from "../graphql/queries";

const mocksQuery: any = [
  {
    request: {
      query: LOGIN,
      variables: {
        email: "rick@email.com",
        password: "987654",
      },
    },
    result: {
      data: {
        login: {
          token: "1111",
          user: {
            id: "01",
            email: "myemail@email.com",
          },
          error: null,
        },
      },
    },
  },
];

const AllTheProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <RouterContext.Provider value={mockedRouter({})}>
      <UserContext.Provider value={UserContextProps}>
        <ReportsContext.Provider value={ReportsContextProps}>
          <CategoriesContext.Provider value={CategoriesContextProps}>
            <ProductsContext.Provider value={ProductsContextProps}>
              <MockedProvider mocks={mocksQuery} addTypename={false}>
                {children}
              </MockedProvider>
            </ProductsContext.Provider>
          </CategoriesContext.Provider>
        </ReportsContext.Provider>
      </UserContext.Provider>
    </RouterContext.Provider>
  );
};

const CustomRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export default CustomRender;
