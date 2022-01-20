"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookSer = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const book_1 = require("@app/data/book");
const user_1 = require("@app/data/user");
const util_1 = require("@app/data/util");
dotenv_1.default.config();
class BookService {
    async addBook(book) {
        return await book_1.BookRepo.create({
            title: book.title,
            img_url: book.img_url,
            copies: book.copies
        });
    }
    async removeBook(id) {
        //@ts-ignore
        const book = await book_1.BookRepo.byID(id);
        if (book.copies !== 0) {
            return await book_1.BookRepo.atomicUpdate(id, {
                $set: {
                    copies: book.copies - 1
                }
            });
        }
    }
    async borrowBook(user, id) {
        console.log('USEEEERR', user);
        //@ts-ignore
        const borrowed = user.books_borrowed.find((book) => book._id === id);
        if (borrowed) {
            throw new util_1.ConstraintError('You cannot borrow more than a copy');
        }
        if (user.books_borrowed.length >= 2) {
            throw new util_1.ConstraintError('You can not borrow more than two books');
        }
        //@ts-ignore
        const bookToBorrow = await book_1.BookRepo.byID({ _id: id });
        const allBorrowed = [...user.books_borrowed, bookToBorrow];
        if (bookToBorrow.copies >= 1) {
            //@ts-ignore
            if (bookToBorrow) {
                await user_1.UserRepo.atomicUpdate(user.id, {
                    $set: {
                        books_borrowed: allBorrowed
                    }
                });
            }
            await book_1.BookRepo.atomicUpdate({ _id: id }, {
                $set: {
                    copies: bookToBorrow.copies - 1
                }
            });
            return bookToBorrow;
        }
        else {
            return 'Book not available';
        }
    }
    async returnBook(user, id) {
        //@ts-ignore
        const bookToReturn = user.books_borrowed.find((book) => book.id === id.id);
        // remove the returned book from the books user borrowed
        const books_borrowed = user.books_borrowed.filter((book) => book.id !== id);
        await user_1.UserRepo.atomicUpdate(user.id, {
            books_borrowed
        });
        //@ts-ignore
        const book = await book_1.BookRepo.byID({ _id: id.id });
        if (book) {
            return await book_1.BookRepo.atomicUpdate({ _id: id.id }, {
                $set: {
                    copies: book.copies + 1
                }
            });
        }
    }
}
exports.BookSer = new BookService();
//# sourceMappingURL=book.js.map