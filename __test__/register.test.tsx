import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import Register from "../pages/register";

import { REGISTER } from "../graphql/queries";

const mocks: any = [
  {
    request: {
      query: REGISTER,
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

describe("<Register />", () => {
  it("render as intended", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Register />
      </MockedProvider>
    );

    //need  an heading
    const loginHeading = screen.getByRole("heading", { name: "Register" });
    expect(loginHeading).toBeVisible();

    //need an email input
    const emailInput = screen.getByRole("textbox", { name: "Email" });
    expect(emailInput).toBeVisible();

    //need an password input
    const passwordList = screen.getAllByText("Password");
    expect(passwordList.length === 2);
    expect(passwordList[0]).toBeVisible();

    //need a register button
    const registerButton = screen.getByRole("button", { name: "Register" });
    expect(registerButton).toBeVisible();
  });
});
