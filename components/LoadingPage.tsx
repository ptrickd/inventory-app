//React
import { Fragment } from 'react'

//Material UI
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        height: '80vh',
        display: 'flex',
        justifyContent: "center",
        alignItems: 'center'
    }
}))

const LoadingPage = () => {
    const classes = useStyles()

    return (
        <Container className={classes.root}>
            <CircularProgress />
        </Container>
    )
}

export default LoadingPage