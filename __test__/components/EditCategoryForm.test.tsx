//Testing
import { screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

//CustomRender
import CustomRender from "../functions/CustomRender";

//Component to test
import EditCategoryForm from "../../components/EditCategoryForm";

describe("<EditCategoryForm />", () => {
  afterEach(() => {
    cleanup();
  });

  it("render as intended", async () => {
    CustomRender(
      <EditCategoryForm
        open={true}
        handleCloseModal={jest.fn()}
        category={{ id: "123456", name: "Produce" }}
      />
    );

    //Has a title
    const Title = screen.getByRole("heading", { name: /Produce/i });
    expect(Title).toBeInTheDocument();

    //Has a input
    const Input = screen.getByRole("textbox", { name: /name/i });
    expect(Input).toBeInTheDocument();

    //Has a edit button
    const EditButton = screen.getByRole("button", { name: /edit/i });
    expect(EditButton).toBeInTheDocument();

    //Has a cancel button
    const CancelButton = screen.getByRole("button", { name: /cancel/i });
    expect(CancelButton).toBeInTheDocument();
  });

  it("change the category name", async () => {
    CustomRender(
      <EditCategoryForm
        open={true}
        handleCloseModal={jest.fn()}
        category={{ id: "123456", name: "Produces" }}
      />
    );

    const user = userEvent.setup();
    // const fetch = jest.fn();

    //Click the input box
    // const Input = screen.getByRole("textbox", { name: /name/i });
    // await user.click(Input);

    //Add a 's' at the end of the current name
    // await user.keyboard("Produces");

    //Click on the edit button
    // const EditButton = screen.getByRole("button", { name: /edit/i });
    // await user.click(EditButton);
    // screen.debug(Input);
    //The title change

    //Graphql has been called
  });
});
