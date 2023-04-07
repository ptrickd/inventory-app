//Testing
import { screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

//CustomRender
import CustomRender from "../functions/CustomRender";

//Mocked Context
import { ProductsContextProps } from "../functions/mockedContexts";

//Component To test
import AddProductForm from "../../components/AddProductForm";

describe("<AddProductFrom />", () => {
  afterEach(() => {
    cleanup();
  });

  it("render as intended", async () => {
    CustomRender(
      <AddProductForm
        open={true}
        handleCloseModal={jest.fn()}
        categoryId="7373"
        position={1}
      />
    );

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

  /////////////////////////////////////////////////////

  it("Send en empty name", async () => {
    const user = userEvent.setup();
    CustomRender(
      <AddProductForm
        open={true}
        handleCloseModal={jest.fn()}
        categoryId="7373"
        position={1}
      />
    );

    const ButtonAdd = screen.getByRole("button", {
      name: /add/i,
    });

    await user.click(ButtonAdd);

    await user.click(ButtonAdd);

    //*Required is generated when sending empty name
    const requiredSpan = screen.getByText(/required/i);

    expect(requiredSpan).toBeInTheDocument();
  });
  /////////////////////////////////////////////////////
});

it("send a valid name", async () => {
  const { addProduct } = ProductsContextProps;

  CustomRender(
    <AddProductForm
      open={true}
      handleCloseModal={jest.fn()}
      categoryId="7373"
      position={1}
    />
  );
  const user = userEvent.setup();

  const ProductInput = screen.getByRole("combobox", {
    name: /add a product/i,
  });

  const ButtonAdd = screen.getByRole("button", {
    name: /add/i,
  });

  await user.click(ProductInput);

  await user.keyboard("Flour");

  await user.keyboard("[Enter]");

  await user.click(ButtonAdd);

  expect(addProduct).toHaveBeenCalledTimes(1);
});
