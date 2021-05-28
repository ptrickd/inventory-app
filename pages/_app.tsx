import { Fragment } from 'react'
import Head from 'next/head'
import Navbar from '../Layout/Navbar'

//GraphQL
import { ApolloProvider } from "@apollo/client";
import client from "../queries/apollo-client";

//Styles
import '../styles/globals.css'
import type { AppProps } from 'next/app'


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Head>

        <title>The App Inventory</title>
      </Head>
      <Navbar />
      <Component {...pageProps} />
    </ApolloProvider>

  )
}
export default MyApp
