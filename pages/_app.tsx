//React
import { Fragment } from 'react'
import Head from 'next/head'
import Navbar from '../Layout/Navbar'

//Context API
import { ProductsProvider } from '../contexts/ProductsContext'

//GraphQL
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";

//Styles
import '../styles/globals.css'
import type { AppProps } from 'next/app'

//Material UI
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { DRAWER_WIDTH } from '../constants/dimensions'

const useStyles = makeStyles((theme: Theme) => createStyles({
  main: {
    marginLeft: DRAWER_WIDTH
  },
  toolbar: theme.mixins.toolbar
}))

function MyApp({ Component, pageProps }: AppProps) {
  const classes = useStyles()
  return (
    <ApolloProvider client={client}>
      <ProductsProvider>
        <Head>
          <title>The App Inventory</title>
        </Head>
        <Navbar />
        <div className={classes.toolbar} />
        <div className={classes.main}>
          <Component {...pageProps} />
        </div>

      </ProductsProvider>
    </ApolloProvider >



  )
}
export default MyApp
