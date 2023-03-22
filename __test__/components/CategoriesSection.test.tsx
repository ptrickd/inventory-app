//Testing
import { screen, cleanup } from "@testing-library/react";

import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

//CustomRender
import CustomRender from "../functions/CustomRender";

//Component to test
import CategoriesSection from "../../components/CategoriesSection";

describe("<CategoriesSection />", () => {
  afterEach(() => {
    cleanup();
  });

  /////////////////////////////////////////////////////

  it("render as intended", async () => {
    CustomRender(
      <CategoriesSection
        listOfCategories={[
          {
            id: "123456",
            name: "Produce",
          },
        ]}
      />
    );

    const user = userEvent.setup();

    //The component has an "Add Category" subtitle
    const CategorySubtitle = screen.getByText(/add category/i);
    expect(CategorySubtitle).toBeInTheDocument();

    //Click on the number of categories to expand section
    const NumberButton = screen.getByRole("button", {
      name: /1/i,
    });
    expect(NumberButton).toBeInTheDocument();

    await act(async () => {
      await user.click(NumberButton);
    });

    //The component display the name of the category
    const CategoryName = await screen.findByText(/produce/i);
    expect(CategoryName).toBeInTheDocument();

    const Link = screen.getByRole("link", { name: /produce/i });

    expect(Link).toHaveAttribute("href", "/category/123456");
  });

  /////////////////////////////////////////////////////

  it("add a category", async () => {
    const handleAddCategory = jest.fn();
    CustomRender(
      <CategoriesSection
        listOfCategories={[
          {
            id: "123456",
            name: "Produce",
          },
        ]}
      />
    );

    const user = userEvent.setup();

    //Find button
    const AddButton = screen.getByRole("button", { name: /add/i });
    expect(AddButton).toBeInTheDocument();

    //Click on the button
    await act(async () => {
      await user.click(AddButton);
    });
    //The modal AddCategory for call
    const InputCategory = screen.getByRole("textbox", {
      name: /add a category/i,
    });
    expect(InputCategory).toBeInTheDocument();
  });

  /////////////////////////////////////////////////////
});
