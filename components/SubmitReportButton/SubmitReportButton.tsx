//Material UI
import Box from "@mui/material/Box";

//Styles
import { classes, StyledButton } from "./SubmitReportButton.style";

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
    <Box component="div">
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
      ) : (
        <StyledButton variant="contained" className={classes.button} disabled>
          Submit
        </StyledButton>
      )}
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
    </Box>
  );
};

export default SubmitReportButton;
