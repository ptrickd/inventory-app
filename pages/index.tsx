import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Container from '@material-ui/core/Container'

export default function Home() {
  return (
    <Container>
      <div className={styles.container}>
        <h1>Next js</h1>
      </div>

    </Container>
  )
}
