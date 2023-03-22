//Testing
import { screen } from "@testing-library/react";

//CustomRender
import CustomRender from "../functions/CustomRender";

//Component to test
import DisplayMessage from "../../components/DisplayMessage";

describe("<DisplayMessage />", () => {
  it("render as intended", async () => {
    CustomRender(<DisplayMessage message={"This is a test"} show={true} />);

    //Message display
    const Message = screen.getByText(/this is a test/i);
  });
});
