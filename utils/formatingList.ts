//types
interface IProduct {
  id: string;
  name: string;
  currentAmount: number;
  previousAmount: number;
  unit: string;
}
//organize list of products by categories for display
export const organizeByCategories = (
  categoriesList: any,
  productsList: any
) => {
  const finalList = categoriesList?.map((category: any) => {
    const listProductsByCategory: any[] = [];

    productsList?.forEach((product: any) => {
      if (category.id === product.categoryId) {
        if (
          product.id !== undefined &&
          product.name !== undefined &&
          product.currentAmount !== undefined &&
          product.previousAmount !== undefined &&
          product.unit !== undefined
        ) {
          listProductsByCategory.push({
            id: product.id,
            name: product.name,
            currentAmount: product.currentAmount,
            previousAmount: product.previousAmount,
            unit: product.unit,
          });
        }
      }
    });
    return {
      categoryName: category.name,
      productsList: listProductsByCategory,
    };
  });
  return finalList;
};
