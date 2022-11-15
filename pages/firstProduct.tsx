//Component inviting the user o choose the date of the first report
//React
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";

//Material UI
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

//Components
import AddCategoryForm from "../components/AddCategoryForm";

//Contexts
import { UserContext } from "../contexts/UserContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: 20,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-around",
    },
    button: {
      width: "70%",
    },
  })
);

const FirstProduct: React.FC = () => {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const router = useRouter();
  const textBody = `Next you have to create your first product in the category you just created. An example is Romaine in the Produce category. `;
  const { loggedIn } = useContext(UserContext);
  const handleModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    if (!loggedIn) router.push("/");
  }, [loggedIn]);

  //make it is own function or add to handleModal??
  const createdProduct = () => {
    router.push("/dashboard");
  };
  return (
    <Container maxWidth="md" className={classes.root}>
      <Typography align="center" variant="body1" paragraph>
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
    </Container>
  );
};

export default FirstProduct;
