//Testing library
import { screen } from "@testing-library/react";

// CustomRender
import CustomRender from "./CustomRender";

//Page to test
import ProductsPage from "../pages/category/[categoryId]";

describe("<ProductsPage />", () => {
  it("render as intended", async () => {
    CustomRender(<ProductsPage />);

    //The page has the name of the category as title
    const categoryName = screen.getByText("Produce");
    expect(categoryName).toBeInTheDocument();

    //The page display a produce
    const productName = screen.getByText("Carrots");
    expect(productName).toBeInTheDocument();

    //The page show the current unit
    const unit = screen.getByText("ea");
    expect(unit).toBeInTheDocument();

    // The page has a button 'Add new product'
    const AddButton = screen.getByText("Add New Product");
    expect(AddButton).toBeInTheDocument();
  });
});
