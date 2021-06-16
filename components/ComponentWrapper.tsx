//React
import React, { Fragment, useContext } from 'react'

//Material UI
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { DRAWER_WIDTH } from '../constants/dimensions'
import clsx from 'clsx'

//Context
import { UserContext } from '../contexts/UserContext'

interface IProps {
    children: React.ReactNode
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    main: {
        marginLeft: 0,
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${DRAWER_WIDTH}px)`,
            marginLeft: DRAWER_WIDTH,
        },
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    toolbar: theme.mixins.toolbar
}))

//Insure the transition of the pages when sidebar come and go
const ComponentWrapper = ({ children }: IProps) => {
    const classes = useStyles()
    const { loggedIn } = useContext(UserContext)

    return (
        <Fragment>
            <div className={classes.toolbar} />
            <div className={clsx(loggedIn && classes.main)}>
                {children}
            </div>
        </Fragment>
    )
}

export default ComponentWrapper