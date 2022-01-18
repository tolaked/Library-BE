import { Model } from "../database";

export interface User extends Model {
  name: string;
  email_address: string;
  books_borrowed?: Array<object>;
  password: string;
}

export interface UserDTO {
  name: string;
  email_address: string;
  books_borrowed?: Array<object>;
  password: string;
}
