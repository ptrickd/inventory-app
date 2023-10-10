//Testing library
import { render, RenderOptions } from "@testing-library/react";

//Mocked Files
import { mockedRouter } from "./mockedRouter";
// import { RouterContext } from "next/dist/shared/lib/router-context";
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";
//Context
import { UserContext } from "../../contexts/UserContext";
import { ReportsContext } from "../../contexts/ReportsContext";
import { CategoriesContext } from "../../contexts/CategoriesContext";
import { ProductsContext } from "../../contexts/ProductsContext";

//ContextProps
import {
  CategoriesContextProps,
  ProductsContextProps,
  UserContextProps,
  ReportsContextProps,
} from "./mockedContexts";

const AllTheProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <RouterContext.Provider value={mockedRouter({})}>
      <UserContext.Provider value={UserContextProps}>
        <ReportsContext.Provider value={ReportsContextProps}>
          <CategoriesContext.Provider value={CategoriesContextProps}>
            <ProductsContext.Provider value={ProductsContextProps}>
              {children}
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
