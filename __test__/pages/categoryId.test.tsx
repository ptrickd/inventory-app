//Testing library
import { screen, cleanup, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import userEvent from "@testing-library/user-event";

//Mocked router
const useRouter = jest.spyOn(require("next/router"), "useRouter");

// CustomRender
import CustomRender from "../functions/CustomRender";

//Page to test
import CategoryId from "../../pages/category/[categoryId]";

//Mocked Query
import { LOGIN } from "../../graphql/queries";

const mocksQuery: any = [
  {
    request: {
      query: LOGIN,
      variables: {
        email: "test@email.com",
        password: "securepassword11",
      },
    },
    result: {
      data: {
        login: {
          token: "1111",
          user: {
            id: "01",
            email: "test@email.com",
          },
          error: null,
        },
      },
    },
  },
  {
    request: {
      query: LOGIN,
      variables: {
        email: "test@email.com",
        password: "securepassword11",
      },
    },
    result: {
      data: {
        login: {
          token: "1111",
          user: {
            id: "01",
            email: "test@email.com",
          },
          error: null,
        },
      },
    },
  },
];

describe("<CategoryId />", () => {
  afterEach(() => {
    cleanup();
  });

  it("render as intended", async () => {
    CustomRender(
      <MockedProvider mocks={mocksQuery} addTypename={false}>
        <CategoryId />
      </MockedProvider>
    );

    //The page has the name of the category as title
    const categoryName = screen.getByText("Produce");
    expect(categoryName).toBeInTheDocument();

    //The page display a produce
    const productName = screen.getByText("Carrots");
    expect(productName).toBeInTheDocument();

    //The page show the current unit
    const unit = screen.getByText("ea");
    expect(unit).toBeInTheDocument();

    // The page has a button 'Add new product'
    const AddButton = screen.getByText("Add New Product");
    expect(AddButton).toBeInTheDocument();

    //the page has a 'next category button'
    const NextCategoryButton = screen.getByRole("button", {
      name: /next category/i,
    });
    expect(NextCategoryButton).toBeInTheDocument();

    //the page has a setting icon
    const SettingsIcon = screen.getByTestId(/settingsicon/i);
    expect(SettingsIcon).toBeInTheDocument();

    //has edit icon
    const EditIcon = screen.getByTestId(/editicon/i);
    expect(EditIcon).toBeInTheDocument();

    //has delete icon
    const DeleteIcon = screen.getByTestId(/deleteicon/i);
    expect(DeleteIcon).toBeInTheDocument();
  });

  it("open the edit modal when clicking on the edit icon", async () => {
    //mock router
    const router = { push: jest.fn(), query: { categoryId: "123456" } };
    useRouter.mockReturnValue(router);

    CustomRender(
      <MockedProvider mocks={mocksQuery} addTypename={false}>
        <CategoryId />
      </MockedProvider>
    );

    const user = userEvent.setup();

    //click on the edit icon
    const EditIcon = screen.getByTestId(/editicon/i);
    await user.click(EditIcon);

    //select the edit button of the modal to confirm ot opened
    const EditButton = screen.getByRole("button", { name: /edit/i });
    expect(EditButton).toBeInTheDocument();
  });

  it("delete the category when clicking on the delete icon", async () => {
    //mock router
    const router = { push: jest.fn(), query: { categoryId: "123456" } };
    useRouter.mockReturnValue(router);

    CustomRender(
      <MockedProvider mocks={mocksQuery} addTypename={false}>
        <CategoryId />
      </MockedProvider>
    );

    const user = userEvent.setup();

    //click on the delete icon
    const DeleteIcon = screen.getByTestId(/deleteicon/i);
    await user.click(DeleteIcon);
  });

  it("goes to the next category when clicking on the button", async () => {
    //mock router
    const router = { push: jest.fn(), query: { categoryId: "123456" } };
    useRouter.mockReturnValue(router);

    CustomRender(
      <MockedProvider mocks={mocksQuery} addTypename={false}>
        <CategoryId />
      </MockedProvider>
    );

    const user = userEvent.setup();

    //click on the next category button
    const NextCategoryButton = screen.getByRole("button", {
      name: /next category/i,
    });
    await user.click(NextCategoryButton);

    await waitFor(async () => {
      expect(router.push).toHaveBeenCalledTimes(1);
      expect(router.push).toHaveBeenCalledWith("123457");
    });
  });
  it("match the snapshot", () => {
    const tree = CustomRender(
      <MockedProvider mocks={mocksQuery} addTypename={false}>
        <CategoryId />
      </MockedProvider>
    );
    expect(tree).toMatchSnapshot();
  });
});
