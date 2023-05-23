export interface ICategory {
  id: string;
  name: string;
}

export type TIds = {
  [propName: string]: string;
};

export interface ISubCategory {
  currentAmount?: number;
  previousAmount?: number;
  categoryId: string;
  position: number;
}

export interface IProduct {
  id?: string;
  categories: ISubCategory[] | [];
  name: string;
  unit: string;
}

export interface IProductByCategory {
  id?: string;
  currentAmount?: number;
  previousAmount?: number;
  categoryId: string;
  name: string;
  unit: string;
  position: number;
}

export interface IAddProduct {
  id?: string;
  name: string;
  currentAmount?: number;
  previousAmount?: number;
  categoryId: string;
  unit?: string;
  position: number;
}

export interface IUser {
  id?: string;
  email: string;
  password?: string;
}
