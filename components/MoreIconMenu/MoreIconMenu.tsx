//Material Ui
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

interface IProps {
  anchorEl: null | HTMLElement;
  handleOnClose: () => void;
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
  );
};

export default MoreIconMenu;
