export type TCategory = {
    id: string
    name: string
}

export type TIds = {
    [propName: string]: string
}

export interface IProduct {
    id?: string
    productId?: string
    currentAmount?: number
    previousAmount?: number
    amount?: number
    name: string
    categoryId: string
    unit: number
}

export interface IAddProduct {
    id?: string
    name: string
    currentAmount?: number
    previousAmount?: number
    categoryId: string
}

export interface IUser {
    id?: string
    email: string
    password?: string
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