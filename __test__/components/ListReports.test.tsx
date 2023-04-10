//Testing
import { screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

//CustomRender
import CustomRender from "../functions/CustomRender";

//Component to test
import ListReports from "../../components/ListReports";

//Fake report
const CurrentReport = {
  categoryName: "Produce",
  productsList: [
    {
      id: "123456",
      name: "Carrots",
      currentAmount: 5,
      previousAmount: 0,
      unit: "ea",
      categoryId: "789456",
      position: 0,
    },
  ],
};

describe("<ListReports />", () => {
  afterEach(() => {
    cleanup();
  });

  /////////////////////////////////////////////////////
  it("render as intended", async () => {
    CustomRender(<ListReports report={CurrentReport} />);

    //has a name
    const CategoryName = screen.getByText(/produce/i);
    expect(CategoryName).toBeInTheDocument();

    //has a 'current' column
    const Current = screen.getByText(/current/i);
    expect(Current).toBeInTheDocument();

    //has a 'Last' column
    const Last = screen.getByText(/last/i);
    expect(Last).toBeInTheDocument();

    //has a 'Unit' column
    const Unit = screen.getByText(/unit/i);
    expect(Unit).toBeInTheDocument();
  });
});
