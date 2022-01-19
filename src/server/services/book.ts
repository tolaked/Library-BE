import dotenv from 'dotenv'
import { BookDTO, BookRepo, Book } from '@app/data/book'
import { User, UserRepo } from '@app/data/user'
import { ConstraintError } from '@app/data/util'

dotenv.config()
interface ID {
  id: string
}

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
    console.log('USEEEERR',user)
      //@ts-ignore
    const borrowed = user.books_borrowed.find((book)=>book._id === id)
    if(borrowed){
      throw new ConstraintError('You cannot borrow more than a copy')
    }
    if (user.books_borrowed.length >= 2) {
      throw new ConstraintError('You can not borrow more than two books')
    }
   
//@ts-ignore
    const bookToBorrow = await BookRepo.byID({_id: id})
    const allBorrowed = [...user.books_borrowed,bookToBorrow]
    
    if (bookToBorrow.copies >= 1) {
      //@ts-ignore
      if (bookToBorrow) {
        await UserRepo.atomicUpdate(user.id, {
          $set: {
            books_borrowed: allBorrowed
          }
        })
      }

       await BookRepo.atomicUpdate({_id:id}, {
        $set: {
          copies: bookToBorrow.copies - 1
        }
      })
      return bookToBorrow
    }
    else{
      return 'Book not available'
    }
  
    
  }

  async returnBook (user: User, id: ID) {
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
    return await BookRepo.atomicUpdate({_id:id.id}, {
      $set: {
        copies: book.copies + 1
      }
    })
  }
  
  }
}

export const BookSer = new BookService()
