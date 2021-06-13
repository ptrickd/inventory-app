//Material UI
import { Container } from "@material-ui/core"
import { makeStyles, Theme, createStyles } from "@material-ui/core"
import { DRAWER_WIDTH } from "../constants/dimensions"

//GraphQL
import { gql, useQuery } from '@apollo/client'

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        marginLeft: DRAWER_WIDTH
    }
}))

const Test = () => {
    const classes = useStyles()
    return (
        <Container className={classes.root}>
            <h1>
                testddddddddddddddddddddddddddddddddddddddddddddddd
            </h1>
        </Container>

    )
}

export default Test