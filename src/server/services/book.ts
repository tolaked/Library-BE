import dotenv from 'dotenv'
import { BookDTO, BookRepo, Book } from '@app/data/book'
import { User, UserRepo } from '@app/data/user'
import { ConstraintError } from '@app/data/util'

dotenv.config()

class BookService {
  async addBook (book: BookDTO) {
    return await BookRepo.create({
      title: book.title,
      img_url: book.img_url,
      copies: book.copies
    })
  }

  async removeBook (id: string) {
    //@ts-ignore
    const book = await BookRepo.byID({_id:id})

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

//@ts-ignore
    const isBook = await BookRepo.byID({_id: id.id})
    
    if (isBook.copies >= 1) {
      //@ts-ignore
      const book = await this.removeBook(id.id)
      if (isBook) {
        await UserRepo.atomicUpdate(user.id, {
          $set: {
            books_borrowed: [...user.books_borrowed,isBook]
          }
        })
      }
    }
    return isBook;
  }

  async returnBook (user: User, id: any) {
    //@ts-ignore
    const bookToReturn: BookDTO = user.books_borrowed.find(
      (book: Book) => book.id === id.id
    )

    // remove the returned book from the books user borrowed
    const books_borrowed = user.books_borrowed.filter(
      (book: Book) => book.id !== id
    )
    await UserRepo.atomicUpdate(user.id, {
      books_borrowed
    })
//@ts-ignore
    const book = await BookRepo.byID({_id:id.id})
    if(book){
    return await BookRepo.atomicUpdate(id, {
      $set: {
        copies: book.copies + 1
      }
    })
  }
  return await this.addBook({
    title: bookToReturn.title,
    img_url: bookToReturn.img_url,
    copies: bookToReturn.copies
  })
  }
}

export const BookSer = new BookService()
