import { SchemaFactory } from "../database";
import { trimmedString } from "../util/schema";
import { SchemaTypes } from "mongoose";

export const UserSchema = SchemaFactory({
  name: { ...trimmedString, required: true, index: true },
  email_address: { ...trimmedString, required: true, index: true },
  books_borrowed: { type: SchemaTypes.Array, default: [], index: true },
  password: { ...trimmedString, required: true }
});
