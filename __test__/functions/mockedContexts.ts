export const UserContextProps = {
  currentUser: { id: "", email: "" },
  setCurrentUser: jest.fn(),
  loggedIn: false,
  setLoggedIn: jest.fn(),
  setToken: jest.fn(),
  logout: jest.fn(),
};

export const ReportsContextProps = {
  hasReport: true,
  reports: [],
  createNewReport: jest.fn(),
  deleteLocalReport: jest.fn(),
};

export const CategoriesContextProps = {
  hasCategory: true,
  setCategories: jest.fn(),
  categories: [
    {
      id: "123456",
      name: "Produce",
    },
  ],
  createCategoryApi: jest.fn(),
  deleteCategoryApi: jest.fn(),
};

export const ProductsContextProps = {
  hasProduct: true,
  products: [
    {
      id: "234567",
      categories: [
        {
          categoryId: "123456",
          currentAmount: 6,
          previousAmount: 0,
          position: 0,
        },
      ],
      name: "Carrots",
      unit: "ea",
    },
  ],
  productsByCategory: [
    {
      id: "234567",
      categoryId: "123456",
      currentAmount: 6,
      previousAmount: 0,
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
