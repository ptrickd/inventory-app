//types
interface IProduct {
  id: string;
  name: string;
  currentAmount: number;
  previousAmount: number;
  unit: string;
}

interface IProductInCategories {
  id: string;
  currentAmount: Number;
  previousAmount: Number;
  categoryId: String;
  position: Number;
}

interface ISubmittedProduct {
  productId: String;
  amount: Number;
  unit: String;
  position: Number;
  categoryId: String;
}

//organize list of products by categories for display
export const organizeByCategories = (
  categoriesList: any,
  productsList: any
) => {
  const finalList = categoriesList?.map((category: any) => {
    const listProductsByCategory: any[] = [];

    //currentAmount previousAmount position in categories:[] now
    productsList?.forEach((product: any) => {
      //find if categoryId in the categories is the same category.id
      product.categories.forEach((categoryInProduct: IProductInCategories) => {
        if (categoryInProduct.categoryId === category.id) {
          listProductsByCategory.push({
            id: categoryInProduct.id,
            name: product.name,
            currentAmount: categoryInProduct.currentAmount,
            previousAmount: categoryInProduct.previousAmount,
            unit: product.unit,
          });
        }
      });
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
      const { productId, amount, unit, position, categoryId } = product;
      productsList.forEach((product: any) => {
        if (product.id === productId) {
          const newCategories = [
            {
              currentAmount: amount,
              previousAmount: 0,
              categoryId,

              position,
            },
          ];
          newArrayOfProducts.push({
            id: productId,
            name: product.name,
            categories: newCategories,
            unit: unit,
          });
        }
      });
    });

    return organizeByCategories(categoriesList, newArrayOfProducts);
  } else return [];
};

//
