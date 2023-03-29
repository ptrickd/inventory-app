//Testing
import { screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
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
  mutation SaveAmountProduct($productId: ID!, $updatedAmount: Int!) {
    saveAmountProduct(productId: $productId, updatedAmount: $updatedAmount) {
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
const mocksQuery: any = [
  {
    request: {
      query: UPDATE_AMOUNT,
      variables: {
        productId: "123456",
        updatedAmount: 5,
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

describe("<InputProduct />", () => {
  afterEach(() => {
    cleanup();
  });

  /////////////////////////////////////////////////////

  it("render as intended", async () => {
    CustomRender(
      <MockedProvider mocks={mocksQuery} addTypename={false}>
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
  //divide this in 2 tests: change 'ea' to box reset to 0 current amount
  it("change the value of the inputs as intended", async () => {
    CustomRender(
      <MockedProvider mocks={mocksQuery} addTypename={false}>
        <InputProduct
          name={"Carrots"}
          currentAmount={1}
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
    await act(async () => {
      await user.click(CurrentInput);
      await user.keyboard("[Backspace]");
      await user.keyboard("5");
    });
    expect(CurrentInput).toHaveDisplayValue("5");
    ///////////////////////////////////////////////////////////

    const SelectButton = screen.getByRole("button", { name: /ea/i });

    await act(async () => {
      await user.click(SelectButton);
    });
    const BoxValue = screen.getByText(/box/i); //try to select arrow drop down icon
    await act(async () => {
      await user.click(BoxValue);
    });

    const ModalText = screen.getByText(/we can't convert that value/i);
    expect(ModalText).toBeVisible();

    const ButtonOK = screen.getByRole("button", { name: /ok/i });
    await act(async () => {
      await user.click(ButtonOK);
    });
    await waitFor(() => {
      const BoxSelectButton = screen.getByRole("button", { name: /box/i });
      expect(BoxSelectButton).toBeInTheDocument();
    });

    expect(CurrentInput).toHaveDisplayValue("0");

    //////////////////////////////////////////////////////
  });

  //   it("shows the settings box when clicking on the settings icon", async () => {});
  //   it("can't enter a letter in the current amount input", async () => {});
});
