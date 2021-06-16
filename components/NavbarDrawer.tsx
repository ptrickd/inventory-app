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

//Icons
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import AddCircleIcon from '@material-ui/icons/AddCircle'

interface ICategory {
    id: string
    name: string
}

interface IProps {
    categories: ICategory[]
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    subMenu: {
        marginLeft: theme.spacing(2),
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar
}))

const NavbarDrawer = ({ categories }: Iprops) => {
    const classes = useStyles()
    const [categoryMenu, setCategoryMenu] = useState(false)
    const handleClickCategories = () => setCategoryMenu(!categoryMenu)
    const renderedCategories = () => {
        return categories.map((category: ICategory) => {
            return <Link href={`/category/${category.id}`} key={category.id}>
                <ListItem
                    className={classes.subMenu}
                    button
                >
                    <ListItemText primary={category.name} />
                    <ListItemIcon><ArrowForwardIcon /></ListItemIcon>

                </ListItem>
            </Link>
        })
    }
    return (
        <Fragment>
            <div className={classes.toolbar} />
            <Divider />
            <List>
                <Link href='/dashboard'>
                    <ListItem button key='dahsboard'>
                        <ListItemText primary='Dashboard' />
                        <ListItemIcon><ArrowForwardIcon /></ListItemIcon>
                    </ListItem>
                </Link>

                <Divider />
                <ListItem button onClick={handleClickCategories} key="category">
                    <ListItemText primary='Categories' />
                    <ListItemIcon >
                        {categoryMenu ? <RemoveCircleIcon /> : <AddCircleIcon />}
                    </ListItemIcon>
                </ListItem>

                {
                    categoryMenu && <Slide direction="down" in={categoryMenu} mountOnEnter unmountOnExit><List>
                        {renderedCategories()}
                    </List></Slide>
                }
            </List>
            <Divider />
            {/* <Link href="/test">Test</Link> */}
        </Fragment>
    )
}

export default NavbarDrawer