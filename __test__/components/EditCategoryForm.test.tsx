//Testing
import { screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { MockedProvider } from "@apollo/client/testing";
import { gql } from "@apollo/client";

//CustomRender
import CustomRender from "../functions/CustomRender";

//Component to test
import EditCategoryForm from "../../components/EditCategoryForm";

const EDIT_CATEGORY = gql`
  mutation EditCategory($categoryId: ID!, $name: String!) {
    editCategory(categoryId: $categoryId, name: $name) {
      name
      error
    }
  }
`;

//Mocked Query
const mocksQuery: any = [
  {
    request: {
      query: EDIT_CATEGORY,
      variables: {
        categoryId: "123456",
        name: "Produces",
      },
    },
    result: {
      data: {
        editCategory: {
          name: "Produces",
          error: null,
        },
      },
    },
  },
];

describe("<EditCategoryForm />", () => {
  afterEach(() => {
    cleanup();
  });

  //////////////////////////////////////////////

  it("render as intended", async () => {
    CustomRender(
      <MockedProvider mocks={mocksQuery} addTypename={false}>
        <EditCategoryForm
          open={true}
          handleCloseModal={jest.fn()}
          category={{ id: "123456", name: "Produce" }}
        />
      </MockedProvider>
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

  //////////////////////////////////////////////

  it("change the category name", async () => {
    CustomRender(
      <MockedProvider mocks={mocksQuery} addTypename={false}>
        <EditCategoryForm
          open={true}
          handleCloseModal={jest.fn()}
          category={{ id: "123456", name: "Produce" }}
        />
      </MockedProvider>
    );

    const user = userEvent.setup();

    //Click the input box
    const Input = screen.getByRole("textbox", { name: /name/i });
    await act(async () => {
      await user.click(Input);
    });

    //Add a 's' at the end of the current name
    await act(async () => {
      await user.keyboard("s");
    });
    //Click on the edit button
    const EditButton = screen.getByRole("button", { name: /edit/i });
    await act(async () => {
      await user.click(EditButton);
    });

    //The title change
    // const Title = await screen.findByRole("heading", { name: /produces/i });
    //Graphql has been called
  });

  //////////////////////////////////////////////
});
