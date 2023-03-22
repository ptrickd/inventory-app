//Testing
import { screen, cleanup } from "@testing-library/react";

import userEvent from "@testing-library/user-event";

//CustomRender
import CustomRender from "../functions/CustomRender";

//Component to test
import CreateNewReportModal from "../../components/CreateNewReportModal";

describe("<CreateNewReportModal />", () => {
  afterEach(() => {
    cleanup();
  });

  /////////////////////////////////////////////////////

  it("renders as intended", async () => {
    //   CustomRender(
    //     <CreateNewReportModal open={true} handleCloseModal={jest.fn()} />
    //   );
    //   //Has a title
    //   const TitleDate = screen.getByText(/date of the next report/i);
    //   expect(TitleDate).toBeInTheDocument();
    //   //Has the input box
    //   const InputDate = screen.getByRole("textbox");
    //   expect(InputDate).toBeInTheDocument();
    //   //Has the button to open the date picker
    //   const ChooseDateButton = screen.getByTestId(/calendaricon/i);
    //   expect(ChooseDateButton).toBeInTheDocument();
    //   //Has the create report button
    //   const CreateButton = screen.getByRole("button", { name: /create/i });
    //   expect(CreateButton).toBeInTheDocument();
  });

  /////////////////////////////////////////////////////

  /////////////////////////////////////////////////////
});
