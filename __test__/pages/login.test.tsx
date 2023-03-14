//React
import React from "react";

//Testing library
import {
  render,
  screen,
  fireEvent,
  cleanup,
  RenderOptions,
} from "@testing-library/react";

//Component
import { default as LoginPage } from "../../pages/login";

//Testing component
import CustomRender from "../functions/CustomRender";

describe("<Login />", () => {
  afterEach(() => {
    cleanup();
  });

  it("render as intended", async () => {
    CustomRender(<LoginPage />);

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
    CustomRender(<LoginPage />);

    //click on the register button
    const registerButton = screen.getByRole("button", { name: "Register" });
    fireEvent.click(registerButton);
  });
});
