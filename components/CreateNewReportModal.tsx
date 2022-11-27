//React
import { useState, useContext } from "react";

//Component
import DatePicker from "./DatePicker";

//Material UI
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

//Time
import { DateTime } from "luxon";

//Context
import { ReportsContext } from "../contexts/ReportsContext";
import { ProductsContext } from "../contexts/ProductsContext";

//Types
import { IProduct, IAddProduct } from "../types/types";
interface IProps {
  open: boolean;
  handleCloseModal: (responseStatusSucceed: boolean) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(4),
      padding: theme.spacing(4),
    },
    button: {
      marginTop: 10,
    },
  })
);

function CreateNewReportModal({ open, handleCloseModal }: IProps) {
  const classes = useStyles();
  const { createNewReport } = useContext(ReportsContext);
  const { products } = useContext(ProductsContext);
  const [selectedDate, setSelectedDate] = useState<null | Date>(null);

  // const [currentDate] = useState(DateTime.now())

  const handleSelectedDate = async (date: Date | null) => {
    // console.log('selectedDate', typeof date)
    // console.log('currentDate', typeof currentDate)
    setSelectedDate(date);
  };

  const handleClickCreate = async () => {
    let responseStatusSucceed = true;
    if (
      selectedDate !== null &&
      products !== undefined &&
      createNewReport !== undefined
    ) {
      let response = await createNewReport(selectedDate);
      //if there a report id then the report has been created
      //if not must show a error message
      if (!response?.data?.createReport?.id) responseStatusSucceed = false;
      //updating the report states
    }

    handleCloseModal(responseStatusSucceed);
  };

  return (
    <Dialog
      open={open}
      aria-labelledby="Create A New Report"
      onClose={() => handleCloseModal(true)}
      className={classes.root}
    >
      <DialogContent>
        <Typography variant="h5">
          Choose the date for the next report
        </Typography>
        <DatePicker handleSelectedDate={handleSelectedDate} />
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleClickCreate}
        >
          Create
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default CreateNewReportModal;
