declare interface ICategory {
  id: string;
  name: string;
}

declare type TIds = {
  [propName: string]: string;
};

declare interface ISubCategory {
  currentAmount?: number;
  previousAmount?: number;
  categoryId: string;
  position: number;
}

declare interface IProduct {
  id?: string;
  categories: ISubCategory[] | [];
  name: string;
  unit: string;
}

declare interface IProductByCategory {
  id?: string;
  currentAmount?: number;
  previousAmount?: number;
  categoryId: string;
  name: string;
  unit: string;
  position: number;
}

declare interface IAddProduct {
  id?: string;
  name: string;
  currentAmount?: number;
  previousAmount?: number;
  categoryId: string;
  unit?: string;
  position: number;
}

declare interface IUser {
  id?: string;
  email: string;
  password?: string;
}
