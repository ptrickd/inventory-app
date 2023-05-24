export interface ISubCategory {
  currentAmount?: number;
  previousAmount?: number;
  categoryId: string;
}
export interface IProductByCategory {
  id: string;
  name: string;
  currentAmount: number;
  previousAmount: number;
  unit: string;
  categoryId: string;
  position: number;
}

export interface ISubmittedProduct {
  productId: string;
  amount: number;
  unit: string;
}

export interface IReport {
  categoryName: string;
  productsList: IProductByCategory[] | [];
}

export interface IServerResponse {
  message: null | string;
  isSuccess: boolean;
  isError: boolean;
}
