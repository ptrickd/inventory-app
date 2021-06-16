//Material Ui
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

interface IProps {
    anchorEl: null | HMTLElement
    handleOnClose: () => void
}

const MoreIconMenu = ({ anchorEl, handleOnClose }: IProps) => {
    return (
        <Menu
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleOnClose}
            keepMounted
        >
            <MenuItem>Logout</MenuItem>
        </Menu>
    )

}

export default MoreIconMenu