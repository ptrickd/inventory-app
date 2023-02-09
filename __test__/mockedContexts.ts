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
  categories: [],
  createCategoryApi: jest.fn(),
  deleteCategoryApi: jest.fn(),
};

export const ProductsContextProps = {
  hasProduct: true,
  products: [],
  productsByCategory: [],
  updateProducts: jest.fn(),
  setCategoryId: jest.fn(),
  addProduct: jest.fn(),
  deleteProductApi: jest.fn(),
  editProductApi: jest.fn(),
};
