//Testing
import { screen, cleanup } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";

//CustomRender
import CustomRender from "../functions/CustomRender";

//Component to test
import AuthForm from "../../components/AuthForm";

describe("<AuthForm />", () => {
  afterEach(() => cleanup());

  /////////////////////////////////////////////////////
  it("render as intended", async () => {
    //Render the component as the Login component
    CustomRender(
      <AuthForm onSubmit={jest.fn()} submitting={false} label={"Login"} />
    );

    //Email input is visible
    const EmailInput = screen.getByRole("textbox", { name: /email/i });
    expect(EmailInput).toBeInTheDocument();

    //Password input is visible
    const PasswordInput = screen.getByLabelText(/password/i);
    expect(PasswordInput).toBeInTheDocument();

    //Login button is visible
    const LoginButton = screen.getByRole("button", { name: /login/i });
    expect(LoginButton).toBeInTheDocument();
  });

  /////////////////////////////////////////////////////

  it("Send the proper data", async () => {
    const handleSubmit = jest.fn();
    //Render the component as the Login component
    act(() => {
      CustomRender(
        <AuthForm onSubmit={handleSubmit} submitting={false} label={"Login"} />
      );
    });

    const user = userEvent.setup();

    //CLick the email input
    const EmailInput = screen.getByRole("textbox", { name: /email/i });
    await act(async () => {
      await user.click(EmailInput);
    });
    await act(async () => {
      //Type a valid email address
      await user.keyboard("test@email.com");
    });
    //CLick the password input
    const PasswordInput = await screen.findByLabelText(/password/i);
    await act(async () => {
      await user.click(PasswordInput);
    });
    //Type a valid password
    await act(async () => {
      await user.keyboard("qwerty");
    });
    //Click the Login button
    const LoginButton = await screen.findByRole("button", { name: /login/i });
    await act(async () => {
      await user.click(LoginButton);
    });
    expect(handleSubmit).toBeCalledTimes(1);
  });

  /////////////////////////////////////////////////////

  it("Send an empty email field value", async () => {
    //Render the component as the Login component

    CustomRender(
      <AuthForm onSubmit={jest.fn()} submitting={false} label={"Login"} />
    );

    const user = userEvent.setup();

    // CLick the password input
    const PasswordInput = screen.getByLabelText(/password/i);
    await act(async () => {
      await user.click(PasswordInput);
    });
    await act(async () => {
      //Type a valid password
      await user.keyboard("qwerty123");
    });
    //Click the Login button
    const LoginButton = await screen.findByRole("button", { name: /login/i });
    await act(async () => {
      await user.click(LoginButton);
    });
    const RequiredText = await screen.findByText(/required/i);

    expect(RequiredText).toBeInTheDocument();
  });

  /////////////////////////////////////////////////////

  it("Send an not conform email", async () => {
    //Render the component as the Login component

    CustomRender(
      <AuthForm onSubmit={jest.fn()} submitting={false} label={"Login"} />
    );

    const user = userEvent.setup();

    //CLick the email input
    const EmailInput = screen.getByRole("textbox", { name: /email/i });
    await act(async () => {
      await user.click(EmailInput);
    });
    //Type a valid email address
    await act(async () => {
      await user.keyboard("test.com");
    });
    // CLick the password input
    const PasswordInput = screen.getByLabelText(/password/i);
    await act(async () => {
      await user.click(PasswordInput);
    });
    await act(async () => {
      //Type a valid password
      await user.keyboard("qwerty123");
    });
    //Click the Login button
    const LoginButton = screen.getByRole("button", { name: /login/i });
    await act(async () => {
      await user.click(LoginButton);
    });
    const RequiredText = await screen.findByText(/Must be a valid email/i);

    expect(RequiredText).toBeInTheDocument();
  });

  /////////////////////////////////////////////////////

  it("Send an empty password", async () => {
    //Render the component as the Login component
    // await act(async () => {
    CustomRender(
      <AuthForm onSubmit={jest.fn()} submitting={false} label={"Login"} />
    );
    // });
    const user = userEvent.setup();

    //CLick the email input
    const EmailInput = screen.getByRole("textbox", { name: /email/i });
    await act(async () => {
      await user.click(EmailInput);
    });
    //Type a valid email address
    await act(async () => {
      await user.keyboard("test@email.com");
    });
    //Click the Login button

    const LoginButton = await screen.findByRole("button", { name: /login/i });
    await act(async () => {
      await user.click(LoginButton);
    });
    const RequiredText = await screen.findByText(/required/i);

    expect(RequiredText).toBeInTheDocument();
  });

  /////////////////////////////////////////////////////
});
