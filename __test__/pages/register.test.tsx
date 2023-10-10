//Testing
import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

//Mocked structure
import { mockedRouter } from "../functions/mockedRouter";
import { MockedProvider } from "@apollo/client/testing";

//Mocked router
const useRouter = jest.spyOn(require("next/router"), "useRouter");

//Component
import Register from "../../pages/register";
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";

//Query
import { REGISTER } from "../../graphql/queries";

const mocks: any = [
  {
    request: {
      query: REGISTER,
      variables: {
        email: "test@email.com",
        password: "securepassword11",
      },
    },
    result: {
      data: {
        register: {
          token: "789456",
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

describe("<Register />", () => {
  it("render as intended", async () => {
    render(
      <RouterContext.Provider value={mockedRouter({})}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Register />
        </MockedProvider>
      </RouterContext.Provider>
    );

    //need  an heading
    const loginHeading = screen.getByRole("heading", { name: "Register" });
    expect(loginHeading).toBeVisible();

    //need an email input
    const emailInput = screen.getByRole("textbox", { name: "Email" });
    expect(emailInput).toBeVisible();

    //need an password input
    const PasswordInput = screen.getByLabelText(/password/i);
    expect(PasswordInput).toBeInTheDocument();

    //need a register button
    const registerButton = screen.getByRole("button", { name: "Register" });
    expect(registerButton).toBeVisible();
  });

  it("send data to register if values are valid", async () => {
    //mock router
    const router = { push: jest.fn() };
    useRouter.mockReturnValue(router);

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Register />
      </MockedProvider>
    );

    const user = userEvent.setup();

    //fill the email input with a valid email
    const EmailInput = screen.getByRole("textbox", { name: /email/i });
    await act(async () => {
      await user.click(EmailInput);
      await user.keyboard("test@email.com");
    });
    //fill the password input with a valid password
    const PasswordInput = screen.getByLabelText(/password/i);
    await act(async () => {
      await user.click(PasswordInput);
      await user.keyboard("securepassword11");
    });

    //click on the button register
    const RegisterButton = screen.getByRole("button", { name: /register/i });

    await user.click(RegisterButton);

    expect(router.push).toHaveBeenCalledWith("/login");
  });

  it("match the snapshot", async () => {
    const tree = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Register />
      </MockedProvider>
    );

    expect(tree).toMatchSnapshot();
  });
});
