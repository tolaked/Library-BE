import dotenv from 'dotenv'
import { BookDTO, BookRepo, Book } from '@app/data/book'
import { User, UserRepo } from '@app/data/user'
import { ConstraintError } from '@app/data/util'

dotenv.config()

class BookService {
  async addBook (book: BookDTO) {
    console.log("I am called")
    return await BookRepo.create({
      title: book.title,
      img_url: book.img_url,
      copies: book.copies
    })
  }

  async removeBook (id: string) {
    const book = await BookRepo.byID(id)

    if (book.copies !== 0) {
      return await BookRepo.atomicUpdate(id, {
        $set: {
          copies: book.copies - 1
        }
      })
    }
  }

  async borrowBook (user: User, id: string) {
    if (user.books_borrowed.length >= 2) {
      throw new ConstraintError('You can not borrow more than two books')
    }

    const isBook = await BookRepo.byID(id)

    if (isBook.copies >= 1) {
      const book = await this.removeBook(id)
      if (book) {
        await UserRepo.atomicUpdate(user.id, {
          $set: {
            books_borrowed: user.books_borrowed.push(book)
          }
        })
      }
    }
    return isBook;
  }

  async returnBook (user: User, id: string) {
    //@ts-ignore
    const bookToReturn: BookDTO = user.books_borrowed.find(
      (book: Book) => book.id === id
    )

    // remove the returned book from the books user borrowed
    const books_borrowed = user.books_borrowed.filter(
      (book: Book) => book.id !== id
    )
    await UserRepo.atomicUpdate(user.id, {
      books_borrowed
    })

    const book = await BookRepo.byID(id)

    return await BookRepo.atomicUpdate(id, {
      $set: {
        copies: book.copies + 1
      }
    })
  }
}

export const BookSer = new BookService()
