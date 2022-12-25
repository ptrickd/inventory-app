//React
import { useState, useContext, useEffect } from "react";

import { styled } from "@mui/material/styles";

//Component
import DatePicker from "./DatePicker";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

//Time
import { DateTime } from "luxon";

//Context
import { ReportsContext } from "../contexts/ReportsContext";
import { ProductsContext } from "../contexts/ProductsContext";

//Types
import { IProduct, IAddProduct } from "../types/types";

const PREFIX = "CreateNewReportModal";

const classes = {
  root: `${PREFIX}-root`,
  button: `${PREFIX}-button`,
};

const StyledDialog = styled(Dialog)(({ theme }) => ({
  [`&.${classes.root}`]: {
    margin: theme.spacing(4),
    padding: theme.spacing(4),
  },

  [`& .${classes.button}`]: {
    marginTop: 10,
  },
}));

interface IResponseStatus {
  succeeded: boolean;
  messageError: string;
}
interface IProps {
  open: boolean;
  handleCloseModal: (responseStatus: IResponseStatus) => void;
}

function CreateNewReportModal({ open, handleCloseModal }: IProps) {
  const { createNewReport } = useContext(ReportsContext);
  const { products } = useContext(ProductsContext);
  const [selectedDate, setSelectedDate] = useState<null | Date>(null);

  const datePickerSelectedDate = async (date: Date | null) => {
    setSelectedDate(date);
  };
  const handleClickCreate = async () => {
    let responseStatus = { succeeded: true, messageError: "" };
    if (
      selectedDate !== null &&
      products !== undefined &&
      createNewReport !== undefined
    ) {
      let response = await createNewReport(selectedDate);
      //if there a report id then the report has been created
      //if not must show a error message
      if (!response?.data?.createReport?.id) {
        // console.log(response.data);
        responseStatus = {
          messageError: response?.data?.createReport?.error,
          succeeded: false,
        };
      }
      //updating the report states
    }

    handleCloseModal(responseStatus);
  };

  return (
    <StyledDialog
      open={open}
      aria-labelledby="Create A New Report"
      onClose={() => handleCloseModal({ succeeded: false, messageError: "" })}
      className={classes.root}
    >
      <DialogContent>
        <Typography align="center" variant="body1" paragraph>
          Date of the next report
        </Typography>
        <DatePicker
          handleSelectedDate={datePickerSelectedDate}
          initialDate={selectedDate}
        />
        {selectedDate ? (
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleClickCreate}
          >
            Create
          </Button>
        ) : (
          <Button
            className={classes.button}
            variant="contained"
            fullWidth
            disabled
          >
            Create
          </Button>
        )}
      </DialogContent>
    </StyledDialog>
  );
}

export default CreateNewReportModal;
