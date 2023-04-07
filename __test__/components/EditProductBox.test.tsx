//Testing
import { screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MockedProvider } from "@apollo/client/testing";

//CustomRender
import CustomRender from "../functions/CustomRender";

//Component To test
import EditProductBox from "../../components/EditProductBox";

//Context
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
describe("<EditProductBox />", () => {
  afterEach(() => {
    cleanup();
  });

  /////////////////////////////////////////////////////

  it("render as intended", () => {
    CustomRender(
      <MockedProvider mocks={mocksQuery} addTypename={false}>
        <EditProductBox
          id={"234567"}
          name={"Carrots"}
          categoryId={"123456"}
          show={true}
          position={1}
          unit={"ea"}
        />
      </MockedProvider>
    );

    //has the arrow up icon
    const ArrowUp = screen.getByTitle("arrow-up");
    expect(ArrowUp).toBeInTheDocument();

    //has the arrow down icon
    const ArrowDown = screen.getByTitle("arrow-down");
    expect(ArrowDown).toBeInTheDocument();

    //has the edit icon
    const EditIcon = screen.getByTitle("edit-icon");
    expect(EditIcon).toBeInTheDocument();

    //has the delete icon
    const DeleteIcon = screen.getByTitle("delete-icon");
    expect(DeleteIcon).toBeInTheDocument();
  });

  /////////////////////////////////////////////////////

  it("clicking on the icons get the proper behaviour", async () => {
    const { editProductApi, deleteProductApi } = ProductsContextProps;

    CustomRender(
      <MockedProvider mocks={mocksQuery} addTypename={false}>
        <EditProductBox
          id={"234567"}
          name={"Carrots"}
          categoryId={"123456"}
          show={true}
          position={1}
          unit={"ea"}
        />
      </MockedProvider>
    );

    const user = userEvent.setup();

    //select and click the arrow up
    const ArrowUp = screen.getByTitle("arrow-up");

    await user.click(ArrowUp);

    expect(editProductApi).toBeCalledTimes(2);

    //select and click the arrow down
    const ArrowDown = screen.getByTitle("arrow-down");

    await user.click(ArrowDown);

    expect(editProductApi).toBeCalledTimes(2);

    //select and click the edit icon
    const EditIcon = screen.getByTitle("edit-icon");

    await user.click(EditIcon);

    const ProductInput = await screen.findByRole("textbox", { name: /name/i });
    expect(ProductInput).toBeVisible();

    //close the edit product modal by clicking the cancel button
    const CancelButton = await screen.findByRole("button", { name: /cancel/i });

    await user.click(CancelButton);

    //select and click the delete icon
    const DeleteIcon = screen.getByTitle("delete-icon");

    await user.click(DeleteIcon);
    expect(deleteProductApi).toBeCalledTimes(1);
  });

  /////////////////////////////////////////////////////
});
