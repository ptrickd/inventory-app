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
import { StatesProvider } from "../contexts/StatesContext";

//GraphQL
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";

//Styles
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Themes from "../styles/Themes";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <UserProvider>
        <CategoriesProvider>
          <ProductsProvider>
            <ReportsProvider>
              <StatesProvider>
                <Themes>
                  <Head>
                    <title>Gruyere: The App Inventory</title>
                  </Head>
                  <Navbar />
                  <ComponentWrapper>
                    <Component {...pageProps} />
                  </ComponentWrapper>
                </Themes>
              </StatesProvider>
            </ReportsProvider>
          </ProductsProvider>
        </CategoriesProvider>
      </UserProvider>
    </ApolloProvider>
  );
}
export default MyApp;
