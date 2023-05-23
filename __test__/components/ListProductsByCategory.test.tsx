//Testing
import { screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

//CustomRender
import CustomRender from "../functions/CustomRender";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";

//Component to test
import ListProductsByCategory from "../../components/ListProductsByCategory";

const Product: IProductByCategory = {
  id: "123456",
  currentAmount: 5,
  previousAmount: 0,
  categoryId: "789456",
  name: "Carrots",
  unit: "ea",
  position: 0,
};

describe("<ListProductsByCategory />", () => {
  afterEach(() => {
    cleanup();
  });

  it("render as intended", async () => {
    CustomRender(
      <TableContainer>
        <Table>
          <ListProductsByCategory product={Product} />
        </Table>
      </TableContainer>
    );

    //display name
    const Name = screen.getByText(/carrots/i);
    expect(Name).toBeInTheDocument();

    //display current amount
    const CurrentAmount = screen.getByText(/5/i);
    expect(CurrentAmount).toBeInTheDocument();

    //display previous amount
    const PreviousAmount = screen.getByText(/0/i);
    expect(PreviousAmount).toBeInTheDocument();

    //display unit
    const Unit = screen.getByText(/ea/i);
    expect(Unit).toBeInTheDocument();
  });
});
