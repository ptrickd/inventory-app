//React
import { Fragment } from 'react'

//Material UI
import { makeStyles, Theme, createStyles } from "@material-ui/core"
import { DRAWER_WIDTH } from "../constants/dimensions"

//Component
import LoadingPage from '../components/LoadingPage'

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        marginLeft: DRAWER_WIDTH
    }
}))

const Test = () => {
    const classes = useStyles()
    return (
        <Fragment >
            <LoadingPage />
        </Fragment>

    )
}

export default Test