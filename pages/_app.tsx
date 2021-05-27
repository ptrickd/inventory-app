import { Fragment } from 'react'
import Head from 'next/head'
import Navbar from '../Layout/Navbar'

//Styles
import '../styles/globals.css'
import type { AppProps } from 'next/app'


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Head>
       
        <title>The App Inventory</title>
      </Head>
      <Navbar />
      <Component {...pageProps} />
    </Fragment>

  )
}
export default MyApp
