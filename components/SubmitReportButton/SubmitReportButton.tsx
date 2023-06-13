//Material UI
import Box from "@mui/material/Box";

//Styles
import {
  classes,
  ContainerButtons,
  StyledButton,
} from "./SubmitReportButton.style";

//Types
interface IProps {
  status: "Not Submitted" | "Submitted";
  handleSubmitClick: () => void;
  handleDeleteClick: () => void;
}

/*
Display delete submit or delete button depending on if 
the report has been submited or not
*/
const SubmitReportButton = ({
  status,
  handleSubmitClick,
  handleDeleteClick,
}: IProps) => {
  return (
    <ContainerButtons component="div" className={classes.containerButtons}>
      {Boolean(status === "Not Submitted") ? (
        <StyledButton
          variant="contained"
          className={classes.button}
          onClick={() => {
            handleSubmitClick();
          }}
        >
          Submit
        </StyledButton>
      ) : null}
      {Boolean(status === "Submitted") ? (
        <StyledButton
          variant="contained"
          color="error"
          className={classes.button}
          onClick={handleDeleteClick}
        >
          Delete
        </StyledButton>
      ) : null}
    </ContainerButtons>
  );
};

export default SubmitReportButton;
