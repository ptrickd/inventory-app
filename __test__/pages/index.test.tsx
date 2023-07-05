import { render, screen } from "@testing-library/react";
import Home from "../../pages/index";
import { mockedRouter } from "../functions/mockedRouter";
import { RouterContext } from "next/dist/shared/lib/router-context";
import "@testing-library/jest-dom";

describe("Home", () => {
  it("Got a title", () => {
    render(
      <RouterContext.Provider value={mockedRouter({})}>
        <Home />
      </RouterContext.Provider>
    );
    const title = screen.getByText("Gruyere");
    expect(title).toBeInTheDocument();
  });

  it("Got a Start button", () => {
    render(
      <RouterContext.Provider value={mockedRouter({})}>
        <Home />
      </RouterContext.Provider>
    );

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("Got a Image", () => {
    render(
      <RouterContext.Provider value={mockedRouter({})}>
        <Home />
      </RouterContext.Provider>
    );

    const image = screen.getByRole("img", { name: "stock photo" });
    expect(image).toBeInTheDocument();
  });
});
