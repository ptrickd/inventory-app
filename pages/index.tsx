/*
/components
/utils
/modals
/graphql
  /queries
  /mutations
*/
//React
import { Fragment } from 'react'
import Image from 'next/image'

//Material UI
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import CssBaseline from '@material-ui/core/CssBaseline'

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  title: {
    marginTop: 20
  },
  section: {
    marginTop: 50,
    flexGrow: 1,
    width: '100%',
  },
  image: {
    display: 'flex',
    justifyContent: 'center'
  }
}))

export default function Home() {
  const classes = useStyles()
  return (
    <Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <div className={classes.root}>
          <Typography
            className={classes.title}
            variant="h4"
            align="center"
          >
            App For Kitchen Inventory
          </Typography>
          <Grid
            className={classes.section}
            container
            justify="center"
            alignItems="center"
            spacing={3}
          >
            <Grid item xs={12} md={6}>
              <Paper>
                <Typography variant="body1">
                  orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more rece Lorem Ipsum
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper className={classes.image}>
                <Image

                  src="/screenshot1.jpg"
                  alt="Screenshot"
                  width={300}
                  height={300}
                />
              </Paper>
            </Grid>
          </Grid>
        </div>

      </Container>
    </Fragment>

  )
}
