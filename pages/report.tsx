//Material UI
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        display: 'flex',
        justifyContent: 'center'
    }
}))

function report() {
    const classes = useStyles()
    return (
        <Container className={classes.root}>
            <Typography
                variant='h2'
            >
                Report
            </Typography>
        </Container>
    )
}

export default report
