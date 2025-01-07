//NextJs
import type { Metadata } from "next";
import type { AppProps } from "next/app";

//Components
import Navbar from "../Layout/Navbar";
import ComponentWrapper from "../components/ComponentWrapper";

//Context API
import { ProductsProvider } from "../contexts/ProductsContext";
import { UserProvider } from "../contexts/UserContext";
import { ReportsProvider } from "../contexts/ReportsContext";
import { CategoriesProvider } from "../contexts/CategoriesContext";

//GraphQL
// import { ApolloProvider } from "@apollo/client";
// import client from "../apollo-client";
import { ApolloWrapper } from "../apollo-client";
import "@pigment-css/react/styles.css";

export const metadata: Metadata = {
  title: "Gruyere: The App Inventory",
  description: "The Perfect Kitchen Inventory App For Small Restaurant",
};

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ApolloWrapper>
          {/* <ApolloProvider client={client}> */}
          {/* <UserProvider>
            <CategoriesProvider>
              <ProductsProvider> */}
          <ReportsProvider>{children}</ReportsProvider>
          {/* </ProductsProvider>
            </CategoriesProvider>
          </UserProvider> */}
          {/* </ApolloProvider> */}
        </ApolloWrapper>
      </body>
    </html>
  );
}
