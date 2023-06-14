/*
put constant here
*/
export const CURRENT_USER_ID = "789456";
export const CURRENT_USER_EMAIL = "test@email.com";

export const REPORT_ID = "789456";
export const CARROT_PRODUCT_ID = "123456";

export const PRODUCE_CATEGORY_ID = "123456";
export const COOLER_CATEGORY_ID = "123457";

export const UserContextProps = {
  currentUser: { id: CURRENT_USER_ID, email: CURRENT_USER_EMAIL },
  setCurrentUser: jest.fn(),
  loggedIn: true,
  setLoggedIn: jest.fn(),
  setToken: jest.fn(),
  logout: jest.fn(),
};

export const ReportsContextProps = {
  hasReport: true,
  reports: [
    {
      id: REPORT_ID,
      userId: CURRENT_USER_ID,
      dateEndingCycle: new Date("2023-04-06T00:00:00.000Z"),

      products: [
        {
          productId: CARROT_PRODUCT_ID,
          amount: 6,
          name: "Carrots",
          categoryId: PRODUCE_CATEGORY_ID,
        },
      ],
      hasBeenSubmitted: false,
      dateCreated: new Date("2023-04-06T00:00:00.000Z"),
      dateSubmitted: new Date("2023-04-06T00:00:00.000Z"),
    },
  ],
  createNewReport: jest.fn(),
  deleteLocalReport: jest.fn(),
};

export const CategoriesContextProps = {
  hasCategory: true,
  setCategories: jest.fn(),
  categories: [
    {
      id: PRODUCE_CATEGORY_ID,
      name: "Produce",
    },
    {
      id: COOLER_CATEGORY_ID,
      name: "Cooler",
    },
  ],
  createCategoryApi: jest.fn(),
  deleteCategoryApi: jest.fn(() => {
    error: true;
  }),
};

export const ProductsContextProps = {
  hasProduct: true,
  products: [
    {
      id: CARROT_PRODUCT_ID,
      categories: [
        {
          categoryId: PRODUCE_CATEGORY_ID,
          currentAmount: 6,
          previousAmount: 5,
          position: 0,
        },
      ],
      name: "Carrots",
      unit: "ea",
    },
  ],
  productsByCategory: [
    {
      id: CARROT_PRODUCT_ID,
      categoryId: PRODUCE_CATEGORY_ID,
      currentAmount: 6,
      previousAmount: 5,
      name: "Carrots",
      unit: "ea",
      position: 0,
    },
  ],
  updateProducts: jest.fn(),
  setCategoryId: jest.fn(),
  addProduct: jest.fn(),
  deleteProductApi: jest.fn(),
  editProductApi: jest.fn(),
};
