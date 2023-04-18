//Testing library
import { screen, cleanup, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import userEvent from "@testing-library/user-event";

//Mocked router
const useRouter = jest.spyOn(require("next/router"), "useRouter");

// CustomRender
import CustomRender from "../functions/CustomRender";

//Mocked context
import { CategoriesContextProps } from "../functions/mockedContexts";

//Page to test
import CategoryId from "../../pages/category/[categoryId]";

//Mocked Query
import { GET_CATEGORIES, LOGIN, GET_CURRENT_USER } from "../../graphql/queries";

const mocksQuery: any = [
  {
    request: {
      query: GET_CURRENT_USER,
      variables: {},
    },
    result: {
      data: {
        currentUser: {
          id: "789456",
          email: "test@email.com",
          theme: "dark",
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
          token: "456789",
          user: {
            id: "789456",
            email: "test@email.com",
            theme: "dark",
          },
          error: null,
        },
      },
    },
  },
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
          {
            id: "123457",
            name: "Cooler",
            error: null,
          },
        ],
      },
    },
  },
];

/*
TESTS
render as intended
open the edit modal when clicking on the edit icon
delete the category when clicking on the delete icon
goes to the next category when clicking on the button
open the settings modal when clicking on the settins icon
match the snapshot
display the message error modal when error from the server
*/

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

    //mock context function
    const { deleteCategoryApi } = CategoriesContextProps;

    CustomRender(
      <MockedProvider mocks={mocksQuery} addTypename={false}>
        <CategoryId />
      </MockedProvider>
    );

    const user = userEvent.setup();

    //click on the delete icon
    const DeleteIcon = screen.getByTestId(/deleteicon/i);
    await user.click(DeleteIcon);

    //call the deleteCategoryAPi
    await waitFor(async () => {
      expect(deleteCategoryApi).toBeCalled();
    });
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

  it("display the message error modal when error from the server", async () => {
    //mock router
    const router = { push: jest.fn(), query: { categoryId: "123456" } };
    useRouter.mockReturnValue(router);

    //mock context function
    const { deleteCategoryApi } = CategoriesContextProps;

    // const returnError = new deleteCategoryApi();

    CustomRender(
      <MockedProvider mocks={mocksQuery} addTypename={false}>
        <CategoryId />
      </MockedProvider>
    );

    const user = userEvent.setup();

    //click on the delete icon
    const DeleteIcon = screen.getByTestId(/deleteicon/i);
    await user.click(DeleteIcon);

    await waitFor(async () => {
      expect(deleteCategoryApi).toBeCalled();
    });

    //message modal display error
    const OkButton = screen.getByRole("button", { name: /ok/i });
    expect(OkButton).toBeInTheDocument();
  });

  it("open the settings modal when clicking on the settins icon", async () => {
    //mock router
    const router = {
      push: jest.fn(),
      query: { categoryId: "123456" },
    };
    useRouter.mockReturnValue(router);

    CustomRender(
      <MockedProvider mocks={mocksQuery} addTypename={false}>
        <CategoryId />
      </MockedProvider>
    );

    const user = userEvent.setup();

    //click on the edit icon
    const SettingsIcon = screen.getByTestId(/settingsicon/i);
    await user.click(SettingsIcon);

    //look if arrow up icon is visible
    await waitFor(() => {
      const ArrowUpIcon = screen.getByTitle("arrow-up");
      expect(ArrowUpIcon).toBeInTheDocument();
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
