//Material UI

import Button from "@mui/material/Button";

//Styles
import { containerButtonsStyle, buttonStyle } from "./SubmitReportButton.style";

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
    <section className={containerButtonsStyle}>
      {Boolean(status === "Not Submitted") ? (
        <Button
          variant="contained"
          className={buttonStyle}
          onClick={() => {
            handleSubmitClick();
          }}
        >
          Submit
        </Button>
      ) : null}
      {Boolean(status === "Submitted") ? (
        <Button
          variant="contained"
          color="error"
          className={buttonStyle}
          onClick={handleDeleteClick}
        >
          Delete
        </Button>
      ) : null}
    </section>
  );
};

export default SubmitReportButton;
