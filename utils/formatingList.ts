//types
interface IProduct {
  id: string;
  name: string;
  currentAmount: number;
  previousAmount: number;
  unit: string;
}

interface ISubmittedProduct {
  productId: string;
  amount: number;
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

//format list from report to be the same shape then products list from context
export const getReportListSubmittedReport = (
  data: any,
  categoriesList: any,
  productsList: any,
  submittedProductsList: any
) => {
  if (data && productsList) {
    //data => productId, amount, unit
    //context =>name
    let newArrayOfProducts: any = [];
    submittedProductsList.map((product: ISubmittedProduct) => {
      const { productId, amount, unit } = product;
      productsList.forEach((product: any) => {
        if (product.id === productId) {
          newArrayOfProducts.push({
            id: productId,
            name: product.name,
            currentAmount: amount,
            previousAmount: 0,
            categoryId: product.categoryId,
            unit: unit,
          });
        }
      });
    });
    return organizeByCategories(categoriesList, newArrayOfProducts);
  } else return [];
};

//
