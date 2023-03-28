//Testing
import { screen, cleanup, getByRole } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { MockedProvider } from "@apollo/client/testing";

//CustomRender
import CustomRender from "../functions/CustomRender";

//Component to test
import EditProductForm from "../../components/EditProductForm";

//Mocked Context
import { ProductsContextProps } from "../functions/mockedContexts";

//Queries
import { GET_CATEGORIES } from "../../graphql/queries";

//Mocked Query
const mocksQuery: any = [
  {
    request: {
      query: GET_CATEGORIES,
      variables: { userId: "789456" },
    },
    result: {
      data: {
        categories: [
          {
            id: "123456",
            name: "Produce",
            error: null,
          },
        ],
      },
    },
  },
];

describe("<EditProductForm />", () => {
  afterEach(() => {
    cleanup();
  });

  /////////////////////////////////////////////////////

  it("render as intended", async () => {
    CustomRender(
      <MockedProvider mocks={mocksQuery} addTypename={false}>
        <EditProductForm
          open={true}
          handleCloseModal={jest.fn()}
          categoryId={"123456"}
          productName={"Carrot"}
          productId={"234567"}
          position={2}
          unit={"ea"}
        />
      </MockedProvider>
    );
    //has a input name product
    const ProductNameInput = await screen.findByRole("textbox", {
      name: /name/i,
    });
    expect(ProductNameInput).toBeInTheDocument();

    //has a select input for category 'produce'
    const SelectInput = await screen.findByRole("button", {
      name: /produce/i,
    });
    expect(SelectInput).toBeInTheDocument();

    //has a 'edit' button
    const EditButton = screen.getByRole("button", { name: /edit/i });
    expect(EditButton).toBeInTheDocument();

    //has a 'cancel' button
    const CancelButton = screen.getByRole("button", { name: /cancel/i });
    expect(CancelButton).toBeInTheDocument();
  });

  /////////////////////////////////////////////////////

  it("change the name of the product", async () => {
    //Mocked functions
    const { editProductApi } = ProductsContextProps;
    CustomRender(
      <MockedProvider mocks={mocksQuery} addTypename={false}>
        <EditProductForm
          open={true}
          handleCloseModal={jest.fn()}
          categoryId={"123456"}
          productName={"Carrot"}
          productId={"234567"}
          position={2}
          unit={"ea"}
        />
      </MockedProvider>
    );

    const user = userEvent.setup();

    //select the name input
    const ProductNameInput = await screen.findByRole("textbox", {
      name: /name/i,
    });
    //add a 's' to 'carrot'
    await act(async () => {
      await user.click(ProductNameInput);
      await user.keyboard("s");
    });

    //click edit button
    const EditButton = screen.getByRole("button", { name: /edit/i });
    await act(async () => {
      await user.click(EditButton);
    });

    expect(editProductApi).toBeCalledTimes(1);
  });
});
