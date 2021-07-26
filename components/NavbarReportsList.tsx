//React
import React, { useEffect, Fragment } from 'react'
import Link from 'next/link'

//Material UI 
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Typography from '@material-ui/core/Typography'

//Color
import { TEXT_MENU_COLOR } from '../constants/colors'

//Icons
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle'
import AddCircleIcon from '@material-ui/icons/AddCircle'

//GraphQL
import { gql, useQuery } from '@apollo/client'

//Date
import { DateTime } from 'luxon'

interface IReport {
    id: string
    userId: string
    date: Date
}

const GET_REPORTS = gql`
    query Reports {
        reports {
            reports{
                id
                date
            }
            error
        }
    }
`

const useStyles = makeStyles((theme: Theme) => createStyles({
    menuText: {
        // color: TEXT_MENU_COLOR,
        textTransform: "none",
        marginLeft: theme.spacing(1),
    },
}))

const NavbarReportsList = () => {
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const { data, loading, error } = useQuery(GET_REPORTS)

    useEffect(() => {
        if (data?.reports?.reports) console.log(data.reports.reports)
    }, [data])

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event?.currentTarget)
    }

    const handleCloseMenu = () => { setAnchorEl(null) }

    const renderedReportsMenu = () => {
        if (data?.reports?.reports.length === 0) {
            return <MenuItem onClick={handleCloseMenu} >
                <Typography variant="body1">No reports saved</Typography>
            </MenuItem >
        }
        return data?.reports?.reports.map((report: IReport, index: number) => {
            console.log(report)
            const dateTime = DateTime.fromISO(report.date.toString())
            const year = dateTime.year
            const month = dateTime.month
            const day = dateTime.day
            return <MenuItem onClick={handleCloseMenu} key={index}>
                <Link href={`/report/${report.id}`}>{`${year}-${month}-${day} `}</Link>
            </MenuItem >
        })
    }

    if (loading) return null
    if (error) return null

    return (
        <Fragment>
            <Button
                className={classes.menuText}
                color="inherit"
                aria-controls="report-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                Reports
            </Button>
            <Menu
                id="report-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
            >
                {renderedReportsMenu()}
            </Menu>
            {/* <ListItem button key='dashboard'>
                <ListItemText primary='Reports' />
                <ListItemIcon className={classes.menuIcon}>
                    {false ? <RemoveCircleIcon /> : <AddCircleIcon />}
                </ListItemIcon>
                {data.reports.reports.length ? <span>
                    <ListItemText primary='Repos' />
                    <ListItemIcon className={classes.menuIcon}>
                        {false ? <RemoveCircleIcon /> : <AddCircleIcon />}
                    </ListItemIcon>
                </span> : null}
            </ListItem> */}
        </Fragment>

    )
}

export default NavbarReportsList