//Testing library
import { screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";

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
        email: "rick@email.com",
        password: "987654",
      },
    },
    result: {
      data: {
        login: {
          token: "1111",
          user: {
            id: "01",
            email: "myemail@email.com",
          },
          error: null,
        },
      },
    },
  },
];

describe("<CategoryId />", () => {
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
  });
});
