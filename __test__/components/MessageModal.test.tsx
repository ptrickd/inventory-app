//Testing
import { screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

//CustomRender
import CustomRender from "../functions/CustomRender";

//Component to test
import MessageModal from "../../components/MessageModal";

describe("<MessageModal />", () => {
  afterEach(() => {
    cleanup();
  });

  /////////////////////////////////////////////////////
  it("render as intended", async () => {
    CustomRender(
      <MessageModal
        open={true}
        message="This is a test"
        isError={false}
        handleClick={jest.fn()}
      />
    );

    //display message
    const Message = screen.getByText(/test/i);
    expect(Message).toBeInTheDocument();

    //got a button close
    const CloseButton = screen.getByRole("button", { name: /ok/i });
    expect(CloseButton).toBeInTheDocument();
  });
  /////////////////////////////////////////////////////
});
