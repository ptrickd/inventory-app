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
const mocksQuery1: any = [
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

const mocksQuery2: any = [
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

  it("reset the  value of the current amount when changing unit from 'ea' to 'box'", async () => {
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
    await act(async () => {
      await user.click(CurrentInput);
      await user.keyboard("[Backspace]");
      await user.keyboard("5");
    });
    expect(CurrentInput).toHaveDisplayValue("5");
    ///////////////////////////////////////////////////////////

    //click on the 'ea' select
    const SelectButton = screen.getByRole("button", { name: /ea/i });

    await act(async () => {
      await user.click(SelectButton);
    });

    //select the now appearing 'box' and click on it
    const BoxValue = screen.getByText(/box/i); //try to select arrow drop down icon
    await act(async () => {
      await user.click(BoxValue);
    });

    //assure the modal is appearing

    const ModalText = screen.getByText(/we can't convert that value/i);
    expect(ModalText).toBeVisible();

    //close the modal
    const ButtonOK = screen.getByRole("button", { name: /ok/i });
    await act(async () => {
      await user.click(ButtonOK);
    });

    //wait for the modal to close and make sure the 'box' has be selected
    await waitFor(() => {
      const BoxSelectButton = screen.getByRole("button", { name: /box/i });
      expect(BoxSelectButton).toBeInTheDocument();
    });

    //the CurrentAmount value has been reset to zero
    expect(CurrentInput).toHaveDisplayValue("0");

    //////////////////////////////////////////////////////
  });
});
//////////////////////////////////////////////////////
// it("multiply the  value of the current amount when changing unit from 'ml' to 'l'", async () => {
// CustomRender(
//   <MockedProvider mocks={mocksQuery2} addTypename={false}>
//     <InputProduct
//       name={"Carrots"}
//       currentAmount={2}
//       previousAmount={0}
//       id={"123456"}
//       categoryId={"789456"}
//       showAmounts={true}
//       measureUnit="ml"
//       position={0}
//       unit="ml"
//     />
//   </MockedProvider>
// );
// const user = userEvent.setup();
//change the value of the current amount
// const CurrentInput = screen.getByRole("textbox", { name: /current/i });
// await act(async () => {
//   await user.click(CurrentInput);
//   await user.keyboard("[Backspace]");
//   await user.keyboard("5");
// });
// expect(CurrentInput).toHaveDisplayValue("5");
//click on the 'ml' select
// const SelectButton = await screen.findByRole("button", { name: /ml/i });
// await act(async () => {
//   await user.click(SelectButton);
// });
//select the now appearing 'ml' and click on it
// await waitFor(async () => {
//   const NewSelectedValue = screen.getByText("l"); //try to select arrow drop down icon
//   await user.click(NewSelectedValue);
// });
// expect(CurrentInput).toHaveDisplayValue("0.05");
// });
//   it("can't enter a letter in the current amount input", async () => {});
