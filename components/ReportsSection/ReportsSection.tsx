//React
import React, { useState } from "react";
import Link from "next/link";

//Components
import MessageModal from "../MessageModal";

//Material UI
import { useTheme } from "@mui/material-pigment-css";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

//Material Icon
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";

//Date
import { DateTime } from "luxon";

//Styles
import {
  classes,
  Section,
  HorizontalBox,
  StyledCollapse,
  StyledButton,
} from "./ReportsSection.style";

//Types
interface IProductInReport {
  name: string;
}
interface IReports {
  id: string;
  userId: string;
  dateEndingCycle: Date;
  products?: IProductInReport[] | [];
  hasBeenSubmitted: boolean;
  dateCreated: Date;
  dateSubmitted: Date;
}
interface IProps {
  list: IReports[] | [];
  handleClickAddModal: () => void;
}

const ReportsSection = ({ list, handleClickAddModal }: IProps) => {
  //Theming
  const theme = useTheme();

  //useState
  const [showList, setShowList] = useState(false);
  const [openMessageModal, setOpenMessageModal] = useState(false);
  const [message, setMessage] = useState("");
  const [isMessageError, setIsMessageError] = useState(false);

  //Response message
  const handleMessageModalClicked = () => {
    setMessage("");
    setOpenMessageModal(false);
    setIsMessageError(false);
  };

  const formattingDate = (date: Date) => {
    const dateInString = date.toString();
    //Create object for Datetime
    const numYear = dateInString.substring(0, 4);
    const numMonth = dateInString.substring(5, 7);
    const numDay = dateInString.substring(8, 10);
    const dateObject = {
      year: Number(numYear),
      month: Number(numMonth),
      day: Number(numDay),
    };

    //Passing object date to Datetime
    const dt = DateTime.fromObject(dateObject);
    return `${dt.toLocaleString({
      year: "numeric",
      month: "long",
      day: "numeric",
    })}`;
  };

  return (
    <Section className={classes.section}>
      <HorizontalBox className={classes.horizontalBox}>
        <IconButton
          aria-label="add category"
          color="icon"
          onClick={handleClickAddModal}
          sx={{ padding: 0 }}
        >
          <AddIcon color="inherit" />
        </IconButton>

        <Typography variant="body1" sx={{ padding: 0, paddingLeft: 1 }}>
          Inventory Report
        </Typography>

        <StyledButton
          onClick={() => setShowList(!showList)}
          className={classes.styledButton}
        >
          <Typography variant="body1" color={theme.palette.text.primary}>
            {list.length}
          </Typography>
        </StyledButton>
      </HorizontalBox>

      <StyledCollapse in={showList} className={classes.styledCollapse}>
        <List>
          {list.map((item) => {
            return (
              <ListItem key={item.id}>
                <Link href={`/report/${item.id}`}>
                  <Typography
                    variant="body1"
                    color={theme.palette.text.primary}
                  >
                    {formattingDate(item.dateEndingCycle)}
                  </Typography>
                </Link>
              </ListItem>
            );
          })}
        </List>
      </StyledCollapse>

      <MessageModal
        open={openMessageModal}
        message={message}
        isError={isMessageError}
        handleClick={handleMessageModalClicked}
      />
    </Section>
  );
};

export default ReportsSection;
