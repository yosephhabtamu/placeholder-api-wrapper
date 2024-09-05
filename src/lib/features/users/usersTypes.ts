import { addUser, deleteUser, fetchUsers, updateUser } from "./userSlice";

export interface FetchUserAction {
  type: typeof fetchUsers.type;
}

export interface AddUserAction {
  type: typeof addUser.type;
  payload: User;
}

export interface UpdateUserAction {
  type: typeof updateUser.type;
  payload: {
    id: string;
    User: Partial<User>;
  };
}

export interface DeleteUserAction {
  type: typeof deleteUser.type;
  payload: number
}

interface Geo {
  lat: string;
  lng: string;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}
