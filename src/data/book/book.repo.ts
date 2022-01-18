import { connection } from "mongoose";
import { Book } from "./book.model";
import { BookSchema } from "./book.schema";
import { BaseRepository } from "../database";

class BookRepository extends BaseRepository<Book> {
  constructor() {
    super(connection, "Book", BookSchema);
  }
}

export const BookRepo = new BookRepository();
