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
import { ApolloWrapper } from "../apollo-client";

import type { AppProps } from "next/app";

import "@pigment-css/react/styles.css";
//Roboto Font
// import "@fontsource/roboto/300.css";
// import "@fontsource/roboto/400.css";
// import "@fontsource/roboto/500.css";
// import "@fontsource/roboto/700.css";

function MyApp({ Component, pageProps }: AppProps) {
  const props = { Component, pageProps };
  return (
    <ApolloWrapper>
      <UserProvider>
        <CategoriesProvider>
          <ProductsProvider>
            <ReportsProvider>
              <Head>
                <title>Gruyere: The App Inventory</title>
              </Head>
              <Navbar />
              <ComponentWrapper>
                <Component {...pageProps} />
              </ComponentWrapper>
            </ReportsProvider>
          </ProductsProvider>
        </CategoriesProvider>
      </UserProvider>
    </ApolloWrapper>
  );
}
export default MyApp;
