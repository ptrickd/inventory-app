//Testing
import { screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MockedProvider } from "@apollo/client/testing";
import { gql } from "@apollo/client";

//CustomRender
import CustomRender from "../functions/CustomRender";

//Component to test
import InputProduct from "../../components/InputProduct";

//Mocked Context
import { CategoriesContextProps } from "../functions/mockedContexts";

//Mutation
const UPDATE_AMOUNT = gql`
  mutation SaveAmountProduct(
    $productId: ID!
    $updatedAmount: Int!
    $categoryId: ID!
  ) {
    saveAmountProduct(
      productId: $productId
      updatedAmount: $updatedAmount
      categoryId: $categoryId
    ) {
      id
    }
  }
`;

const UPDATE_UNIT = gql`
  mutation SaveUnitProduct($productId: ID!, $updatedUnit: String!) {
    saveUnitProduct(productId: $productId, updatedUnit: $updatedUnit) {
      id
    }
  }
`;

//Mocked Query
const mocksQuery1: any = [
  {
    request: {
      query: UPDATE_AMOUNT,
      variables: {
        productId: "123456",
        updatedAmount: 5,
        categoryId: "789456",
      },
    },
    result: {
      data: {
        saveAmountProduct: {
          id: "123456",
        },
      },
    },
  },
  {
    request: {
      query: UPDATE_UNIT,
      variables: {
        productId: "123456",
        updatedUnit: "box",
      },
    },
    result: {
      data: {
        saveUnitProduct: {
          id: "123456",
        },
      },
    },
  },
];

const mocksQuery2: any = [
  {
    request: {
      query: UPDATE_AMOUNT,
      variables: {
        productId: "123456",
        updatedAmount: 5,
        categoryId: "789456",
      },
    },
    result: {
      data: {
        saveAmountProduct: {
          id: "123456",
        },
      },
    },
  },
  {
    request: {
      query: UPDATE_UNIT,
      variables: {
        productId: "123456",
        updatedUnit: "l",
      },
    },
    result: {
      data: {
        saveUnitProduct: {
          id: "123456",
        },
      },
    },
  },
];

describe("<InputProduct />", () => {
  afterEach(() => {
    cleanup();
  });

  /////////////////////////////////////////////////////

  it("render as intended", async () => {
    CustomRender(
      <MockedProvider mocks={mocksQuery1} addTypename={false}>
        <InputProduct
          name={"Carrots"}
          currentAmount={1}
          previousAmount={0}
          id={"123456"}
          categoryId={"789456"}
          showAmounts
          measureUnit="ea"
          position={0}
          unit="ea"
        />
      </MockedProvider>
    );

    //has the name of the products
    const Name = screen.getByRole("heading", { name: /carrots/i });
    expect(Name).toBeInTheDocument();

    //has current amount
    const CurrentInput = screen.getByRole("textbox", { name: /current/i });
    expect(CurrentInput).toBeInTheDocument();

    //has previous amount
    const PreviousAmount = screen.getByText(/last/i);
    expect(PreviousAmount).toBeInTheDocument();

    //has unit
    const UnitSelect = screen.getByRole("button", { name: /ea/i });
    expect(UnitSelect).toBeInTheDocument();

    //has the settings icon
    const SettingsIcon = screen.getByTestId(/settingsicon/i);
    expect(SettingsIcon).toBeInTheDocument();
  });

  /////////////////////////////////////////////////////

  it("change value of the current amount and the unit from 'ea' to 'box'", async () => {
    CustomRender(
      <MockedProvider mocks={mocksQuery1} addTypename={false}>
        <InputProduct
          name={"Carrots"}
          currentAmount={2}
          previousAmount={0}
          id={"123456"}
          categoryId={"789456"}
          showAmounts={true}
          measureUnit="ea"
          position={0}
          unit="ea"
        />
      </MockedProvider>
    );

    const user = userEvent.setup();

    //change the value of the current amount to '5'
    const CurrentInput = screen.getByRole("textbox", { name: /current/i });

    await user.click(CurrentInput);
    await user.keyboard("[Backspace]");
    await user.keyboard("5");

    expect(CurrentInput).toHaveDisplayValue("5");
    ///////////////////////////////////////////////////////////

    //click on the 'ea' select
    const SelectButton = screen.getByRole("button", { name: /ea/i });

    await user.click(SelectButton);

    //select the now appearing 'box' and click on it
    const BoxValue = screen.getByText(/box/i);

    await user.click(BoxValue);

    const BoxButton = screen.getByRole("button", { name: /box/i });
    expect(BoxButton).toBeInTheDocument();

    //////////////////////////////////////////////////////
  });
  //////////////////////////////////////////////////////
  it("can't enter a letter in the current amount input", async () => {
    CustomRender(
      <MockedProvider mocks={mocksQuery2} addTypename={false}>
        <InputProduct
          name={"Carrots"}
          currentAmount={2}
          previousAmount={0}
          id={"123456"}
          categoryId={"789456"}
          showAmounts={true}
          measureUnit="ea"
          position={0}
          unit="ea"
        />
      </MockedProvider>
    );
    const user = userEvent.setup();

    // change the value of the current amount
    const CurrentInput = screen.getByRole("textbox", { name: /current/i });

    await user.click(CurrentInput);
    await user.keyboard("l");

    //Click the select component to trigger the onBlur of the current input component
    const SelectButton = screen.getByRole("button", { name: /ea/i });

    await user.click(SelectButton);

    //Verify the error message is display
    const ErrorMessage = screen.getByText(/not a number/i);
    expect(ErrorMessage).toBeVisible();
  });
  //////////////////////////////////////////////////////

  it("can't send empty value of the current amount", async () => {
    CustomRender(
      <MockedProvider mocks={mocksQuery2} addTypename={false}>
        <InputProduct
          name={"Carrots"}
          currentAmount={2}
          previousAmount={0}
          id={"123456"}
          categoryId={"789456"}
          showAmounts={true}
          measureUnit="ea"
          position={0}
          unit="ea"
        />
      </MockedProvider>
    );
    const user = userEvent.setup();

    // change the value of the current amount
    const CurrentInput = screen.getByRole("textbox", { name: /current/i });

    await user.click(CurrentInput);
    await user.keyboard("[Backspace]");

    //Click the select component to trigger the onBlur of the current input component
    const SelectButton = screen.getByRole("button", { name: /ea/i });

    await user.click(SelectButton);

    //Verify the error message is display
    const ErrorMessage = screen.getByText(/required/i);
    expect(ErrorMessage).toBeVisible();
  });
});
