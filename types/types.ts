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
}

export interface IAddProduct {
  id?: string;
  name: string;
  currentAmount?: number;
  previousAmount?: number;
  categoryId: string;
  unit?: string;
}

export interface IUser {
  id?: string;
  email: string;
  password?: string;
}

//Interface to define a new object or method of an object
// interface TodoProps {
//     name: string;
//     isCompleted: boolean
// };

// const Todo: React.FC<TodoProps> = ({ name, isCompleted }) => {
//   ...
// };

//Type are better when you need to create functions
// type Person = {
//     name: string,
//     age: number
// };

// type ReturnPerson = (
//     person: Person
// ) => Person;

// const returnPerson: ReturnPerson = (person) => {
//     return person;
// };
