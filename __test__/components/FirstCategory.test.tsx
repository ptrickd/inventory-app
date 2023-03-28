//Testing
import { screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

//CustomRender
import CustomRender from "../functions/CustomRender";

//Component to test
import FirstCategory from "../../components/FirstCategory";

//Mocked Context
import { CategoriesContextProps } from "../functions/mockedContexts";

describe("<FirstCategory />", () => {
  afterEach(() => {
    cleanup();
  });

  /////////////////////////////////////////////////////

  it("render as intended", async () => {
    CustomRender(<FirstCategory />);

    const Text = screen.getByText(
      /Next you have to create your first category./i
    );
    expect(Text).toBeInTheDocument();

    const ButtonDoIt = screen.getByRole("button", { name: /do it/i });
    expect(ButtonDoIt).toBeInTheDocument();
  });

  /////////////////////////////////////////////////////

  it("click on the do it button bring next screen", async () => {
    CustomRender(<FirstCategory />);
    const user = userEvent.setup();

    //find and click the 'do it' button
    const ButtonDoIt = screen.getByRole("button", { name: /do it/i });
    await act(async () => {
      await user.click(ButtonDoIt);
    });
    //the <AddCategoryForm /> modal open
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
  });
});
