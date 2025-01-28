//NextJs
import type { Metadata } from "next";

//Components
import Navbar from "../Layout/Navbar";
import ComponentWrapper from "../components/ComponentWrapper";
import Footer from "../Layout/Footer";

//Context API
import { ProductsProvider } from "../contexts/ProductsContext";
import { UserProvider } from "../contexts/UserContext";
import { ReportsProvider } from "../contexts/ReportsContext";
import { CategoriesProvider } from "../contexts/CategoriesContext";

//GraphQL
import { ApolloWrapper } from "../apollo-client";

//Required by pigment-css
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
          <UserProvider>
            <CategoriesProvider>
              <ProductsProvider>
                <ReportsProvider>
                  <Navbar />
                  <ComponentWrapper>
                    {children}

                    <Footer />
                  </ComponentWrapper>
                </ReportsProvider>
              </ProductsProvider>
            </CategoriesProvider>
          </UserProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
