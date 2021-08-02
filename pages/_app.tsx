//React
import Head from 'next/head'

//Components
import Navbar from '../Layout/Navbar'
import ComponentWrapper from '../components/ComponentWrapper'

//Context API
import { ProductsProvider } from '../contexts/ProductsContext'
import { UserProvider } from '../contexts/UserContext'
import { ReportsProvider } from '../contexts/ReportsContext'

//GraphQL
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";

//Styles
import '../styles/globals.css'
import type { AppProps } from 'next/app'


function MyApp({ Component, pageProps }: AppProps) {

  return (
    <ApolloProvider client={client}>
      <UserProvider>
        <ReportsProvider>
          <ProductsProvider>
            <Head>
              <title>The App Inventory</title>
            </Head>
            <Navbar />
            <ComponentWrapper>
              <Component {...pageProps} />
            </ComponentWrapper>
          </ProductsProvider>
        </ReportsProvider>
      </UserProvider>
    </ApolloProvider >
  )
}
export default MyApp
