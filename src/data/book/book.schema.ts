import { SchemaTypes } from "mongoose";
import { SchemaFactory } from "../database";
import { trimmedString } from "../util/schema";

export const BookSchema = SchemaFactory({
  title: { ...trimmedString, required: true, index: true },
  img_url: { ...trimmedString, required: true, index: true },
  copies: { type: SchemaTypes.Number, index: true, default: 0}
});
