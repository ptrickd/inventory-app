//React
import React from "react";
import { MockedProvider } from "@apollo/client/testing";
import userEvent from "@testing-library/user-event";

//Mocked router
const useRouter = jest.spyOn(require("next/router"), "useRouter");

//Testing library
import { screen, cleanup } from "@testing-library/react";

//Component
import { default as LoginPage } from "../../pages/login";

//Testing component
import CustomRender from "../functions/CustomRender";

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
          token: "456789",
          user: {
            id: "123456",
            email: "test@email.com",
            theme: "dark",
          },
          error: null,
        },
      },
    },
  },
];

describe("<Login />", () => {
  afterEach(() => {
    cleanup();
  });

  it("render as intended", async () => {
    CustomRender(
      <MockedProvider mocks={mocksQuery} addTypename={false}>
        <LoginPage />
      </MockedProvider>
    );

    //need an heading
    const loginHeading = screen.getByRole("heading", { name: "Login" });
    expect(loginHeading).toBeVisible();

    //need an input for email
    const emailInput = screen.getByRole("textbox", { name: "Email" });
    expect(emailInput).toBeVisible();

    //need an input for password
    const passwordList = screen.getAllByText("Password");
    expect(passwordList.length === 2);
    expect(passwordList[0]).toBeVisible();

    //need a button for login
    const loginButton = screen.getByRole("button", { name: "Login" });
    expect(loginButton).toBeVisible();

    //need a button for register
    const registerButton = screen.getByRole("button", { name: "Register" });
    expect(registerButton).toBeVisible();
  });

  it("navigate when clicking REGISTER button", async () => {
    const router = { push: jest.fn() };
    useRouter.mockReturnValue(router);

    CustomRender(
      <MockedProvider mocks={mocksQuery} addTypename={false}>
        <LoginPage />
      </MockedProvider>
    );

    const user = userEvent.setup();

    const registerButton = screen.getByRole("button", { name: /register/i });
    await user.click(registerButton);

    expect(router.push).toHaveBeenCalledWith("/register");
  });

  it("send login request when clicking on the login button", async () => {
    //mock router
    const router = { push: jest.fn() };
    useRouter.mockReturnValue(router);

    CustomRender(
      <MockedProvider mocks={mocksQuery} addTypename={false}>
        <LoginPage />
      </MockedProvider>
    );

    const user = userEvent.setup();

    //enter a valid email address
    const emailInput = screen.getByRole("textbox", { name: "Email" });
    await user.click(emailInput);
    await user.keyboard("test@email.com");

    //enter a valid password
    const passwordInput = screen.getByLabelText(/password/i);
    await user.click(passwordInput);
    await user.keyboard("securepassword11");

    //click on the login button
    const loginButton = screen.getByRole("button", { name: /login/i });
    await user.click(loginButton);

    expect(router.push).toHaveBeenCalledWith({ pathname: "/dashboard" });
  });
  it("match the snapshot", () => {
    const tree = CustomRender(
      <MockedProvider mocks={mocksQuery} addTypename={false}>
        <LoginPage />
      </MockedProvider>
    );
    expect(tree).toMatchSnapshot();
  });
});
