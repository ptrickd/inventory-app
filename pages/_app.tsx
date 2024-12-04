//React
import Head from "next/head";

//Components
import Navbar from "../Layout/Navbar";
import ComponentWrapper from "../components/ComponentWrapper";

//Context API
import { ProductsProvider } from "../contexts/ProductsContext";
import { UserProvider } from "../contexts/UserContext";
import { ReportsProvider } from "../contexts/ReportsContext";
import { CategoriesProvider } from "../contexts/CategoriesContext";

//GraphQL
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";

//Styles
import { Theme } from "@mui/material/styles";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Themes from "../styles/Themes";
import "@pigment-css/react/styles.css";
//Roboto Font
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

//Declare types for pigment css
declare module "@mui/material-pigment-css" {
  interface ThemeArgs {
    theme: Theme;
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <UserProvider>
        <CategoriesProvider>
          <ProductsProvider>
            <ReportsProvider>
              {/* <Themes> */}
              <Head>
                <title>Gruyere: The App Inventory</title>
              </Head>
              <Navbar />
              <ComponentWrapper>
                <Component {...pageProps} />
              </ComponentWrapper>
              {/* </Themes> */}
            </ReportsProvider>
          </ProductsProvider>
        </CategoriesProvider>
      </UserProvider>
    </ApolloProvider>
  );
}
export default MyApp;
