//Testing
import { screen, cleanup } from "@testing-library/react";

import userEvent from "@testing-library/user-event";

//CustomRender
import CustomRender from "../functions/CustomRender";

//Component to test
import AddCategoryForm from "../../components/AddCategoryForm";

//Mocked Context
import { CategoriesContextProps } from "../functions/mockedContexts";

describe("<AddCategoryForm />", () => {
  afterEach(() => {
    cleanup();
  });

  /////////////////////////////////////////////////////
  it("render as intended", async () => {
    CustomRender(
      <AddCategoryForm open={true} handleCloseModal={() => "Produce"} />
    );

    //The component has an input box for the name
    const CategoryInput = screen.getByRole("textbox", {
      name: /add a category/i,
    });
    expect(CategoryInput).toBeInTheDocument();

    //The component has a button 'Add'
    const ButtonAdd = screen.getByRole("button", {
      name: /add/i,
    });
    expect(ButtonAdd).toBeInTheDocument();

    //The component has a cancel buton
    const ButtonCancel = screen.getByRole("button", { name: /cancel/i });
    expect(ButtonCancel).toBeInTheDocument();
  });

  /////////////////////////////////////////////////////

  it("Send the rigth info", async () => {
    const { createCategoryApi } = CategoriesContextProps;

    CustomRender(
      <AddCategoryForm open={true} handleCloseModal={() => "Produce"} />
    );
    const user = userEvent.setup();

    // const createCategoryApi = jest.fn();

    const CategoryInput = screen.getByRole("textbox", {
      name: /add a category/i,
    });
    const ButtonAdd = screen.getByRole("button", {
      name: /add/i,
    });
    await user.click(CategoryInput);

    await user.keyboard("Dessert Line");
    await user.click(ButtonAdd);

    expect(createCategoryApi).toHaveBeenCalledTimes(1);
  });

  /////////////////////////////////////////////////////

  it("Send en empty name", async () => {
    const user = userEvent.setup();
    CustomRender(<AddCategoryForm open={true} handleCloseModal={jest.fn()} />);

    const ButtonAdd = screen.getByRole("button", {
      name: /add/i,
    });
    await user.click(ButtonAdd);

    //*Required is generated when sending empty name
    const requiredSpan = screen.getByText(/required/i);

    expect(requiredSpan).toBeInTheDocument();
  });
  /////////////////////////////////////////////////////
});
