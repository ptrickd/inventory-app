//Testing
import { screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

//CustomRender
import CustomRender from "../functions/CustomRender";

//Component to test
import ErrorModal from "../../components/ErrorModal";

describe("<ErrorModal />", () => {
  afterEach(() => {
    cleanup();
  });

  /////////////////////////////////////////////////////

  it("render as intended", async () => {
    CustomRender(<ErrorModal open={true} handleCloseModal={jest.fn()} />);

    //has text
    const Text = screen.getByText(
      /You can't submit two reports with the same date./i
    );
    expect(Text).toBeInTheDocument();

    //has a button close
    const CloseButton = screen.getByRole("button", { name: /close/i });
    expect(CloseButton).toBeInTheDocument();
  });

  /////////////////////////////////////////////////////
});
