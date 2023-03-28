//Testing
import { screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

//CustomRender
import CustomRender from "../functions/CustomRender";

//Component to test
import FirstProduct from "../../components/FirstProduct";

describe("<FirstProduct />", () => {
  afterEach(() => {
    cleanup();
  });

  /////////////////////////////////////////////////////

  it("render as intended", async () => {
    CustomRender(<FirstProduct />);

    const Text = screen.getByText(
      /Next you have to create your first product in the category you just created./i
    );
    expect(Text).toBeInTheDocument();

    const ButtonDoIt = screen.getByRole("button", { name: /do it/i });
    expect(ButtonDoIt).toBeInTheDocument();
  });

  /////////////////////////////////////////////////////

  it("render <AddProductForm /> after clicking on the button", async () => {
    CustomRender(<FirstProduct />);
    const user = userEvent.setup();

    //find and click the button 'do it'
    const ButtonDoIt = screen.getByRole("button", { name: /do it/i });
    await act(async () => {
      await user.click(ButtonDoIt);
    });

    //test if the <AddProductForm /> has rendered
    //The component has an input box for the name
    const ProductInput = screen.getByRole("combobox", {
      name: /add a product/i,
    });
    expect(ProductInput).toBeInTheDocument();

    //The component has a button 'Add'
    const ButtonAdd = screen.getByRole("button", {
      name: /add/i,
    });
    expect(ButtonAdd).toBeInTheDocument();

    //The component has a cancel buton
    const ButtonCancel = screen.getByRole("button", { name: /cancel/i });

    expect(ButtonCancel).toBeInTheDocument();
  });
});
