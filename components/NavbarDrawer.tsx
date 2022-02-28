//React
import { Fragment, useState } from 'react'
import Link from 'next/link'

//Material UI
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Divider from '@material-ui/core/Divider'
import Slide from '@material-ui/core/Slide'

//Color
import { TEXT_MENU_COLOR } from '../constants/colors'

//Icons
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import AddCircleIcon from '@material-ui/icons/AddCircle'

//Components
import NavbarReportsList from './NavbarReportsList'

//Types
import { TCategory } from '../types/types'
interface IProps {
    categories: TCategory[]
}


const useStyles = makeStyles((theme: Theme) => createStyles({
    menu: {
        color: TEXT_MENU_COLOR
    },
    menuIcon: {
        color: TEXT_MENU_COLOR
    },
    subMenu: {
        marginLeft: theme.spacing(2),
        color: TEXT_MENU_COLOR
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar
}))

const NavbarDrawer = ({ categories }: IProps) => {
    const classes = useStyles()
    const [categoryMenu, setCategoryMenu] = useState(false)
    const handleClickCategories = () => setCategoryMenu(!categoryMenu)
    const renderedCategories = () => {
        return categories.map((category: TCategory) => {
            // console.log(category)
            return <Link href={`/category/${category.id}`} key={category.id}>
                <ListItem
                    className={classes.subMenu}
                    button
                >
                    <ListItemText primary={category.name} />
                    <ListItemIcon className={classes.menuIcon}><ArrowForwardIcon /></ListItemIcon>

                </ListItem>
            </Link>
        })
    }
    return (
        <Fragment>
            {/* //Add the primary color on the top on the sidebar side */}

            <div className={classes.toolbar} />


            <Divider />

            <List >
                <Link href='/dashboard'>
                    <span className={classes.menu}>
                        <ListItem button key='dashboard'>
                            <ListItemText primary='Dashboard' />
                            <ListItemIcon className={classes.menuIcon}><ArrowForwardIcon /></ListItemIcon>
                        </ListItem>
                    </span>

                </Link>

                <span className={classes.menu}>
                    {/* <ListItem> */}
                    {/* <NavbarReportsList /> */}

                    {/* </ListItem> */}
                </span>


                <Divider />
                <span className={classes.menu}>
                    <ListItem button onClick={handleClickCategories} key="category">
                        <ListItemText primary='Categories' />
                        <ListItemIcon className={classes.menuIcon}>
                            {categoryMenu ? <RemoveCircleIcon /> : <AddCircleIcon />}
                        </ListItemIcon>
                    </ListItem>
                </span>


                {
                    categoryMenu && <Slide direction="down" in={categoryMenu} mountOnEnter unmountOnExit><List>
                        {renderedCategories()}
                    </List></Slide>
                }
            </List>
            <Divider />
        </Fragment>
    )
}

export default NavbarDrawer