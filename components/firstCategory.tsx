//Component inviting the user o choose the date of the first report
//React
import React, { useState, useContext } from "react";

//Material UI
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

//Components
import AddCategoryForm from "./AddCategoryForm";
import DisplayMessage from "./DisplayMessage";

//Context
import { StatesContext } from "../contexts/StatesContext";

const PREFIX = "FirstCategory";

const classes = {
  button: `${PREFIX}-button`,
  root: `${PREFIX}-root`,
  items: `${PREFIX}-items`,
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled("div")(({ theme: Theme }) => ({
  [`& .${classes.button}`]: {
    width: "70%",
  },
  [`& .${classes.items}`]: { flexGrow: 2 },
  [`& .${classes.root}`]: {
    display: "flex",
    minHeight: "70vh",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "10%",
  },
}));

//Interfaces
interface ICategory {
  id: string;
  name: string;
  error: string;
}

const FirstCategory: React.FC = () => {
  const { setHasCategory } = useContext(StatesContext);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [messageError, setMessageError] = useState("");
  const textBody = `Next you have to create your first category. Example are "Cooler" or "Dry Storage". `;
  const handleModal = (category?: ICategory) => {
    if (category) {
      if (category.error) {
        setMessageError(category.error);
      } else if (category.id) {
        if (setHasCategory) setHasCategory(true);
      }
    }

    setOpenModal(false);
  };

  return (
    <Root>
      <div className={classes.root}>
        <Typography
          align="center"
          variant="body1"
          paragraph
          className={classes.items}
        >
          {textBody}
        </Typography>
        <Button
          onClick={() => setOpenModal(true)}
          className={classes.button}
          variant="contained"
          color="primary"
          size="large"
        >
          Do it
        </Button>
        <AddCategoryForm open={openModal} handleCloseModal={handleModal} />
        <DisplayMessage show={messageError.length > 0} message={messageError} />
      </div>
    </Root>
  );
};

export default FirstCategory;
