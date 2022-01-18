import {
    controller,
    httpPost,
    requestBody,
    request,
    response,
    requestParam,
    httpGet
  } from "inversify-express-utils";
  import { Request, Response } from "express";
  import { Book, BookDTO, BookRepo } from "@app/data/book";
  import { BaseController } from "@app/data/util";
  import { validate } from "@app/data/util"
  import { isBook, isID } from "./book.validate";
  import { BookSer } from "@app/services/book";
  import { secure } from "@app/common/authorization";
  
  type ControllerResponse = Book | Book[];
  
  @controller("/book")
  export class BookController extends BaseController<ControllerResponse> {
    @httpPost("/", secure, validate(isBook))
    async addBookToLibrary(
      @request() req: Request,
      @response() res: Response,
      @requestBody() body: BookDTO
    ) {
      const book = await BookSer.addBook(body)
      this.handleSuccess(req, res, book);
    }
  
    @httpGet("/", secure)
    async viewAllBooks(
      @request() req: Request,
      @response() res: Response,
      ){
      const books = await BookRepo.all({});
      this.handleSuccess(req, res, books)
    }
    
    @httpPost("/:id", secure, validate(isID))
    async returnBook(
      @request() req: Request,
      @response() res: Response,
      @requestParam() id: string
    ) {
      //@ts-ignore
      const book = await BookSer.returnBook(req.user, id)
      this.handleSuccess(req, res, book)
    }
  
    @httpGet("/:id", secure)
    async borrowBook(
      @request() req: Request,
      @response() res: Response,
      @requestParam() id: string
    ) {
      //@ts-ignore
      const book = await BookSer.borrowBook(req.user, id)
      this.handleSuccess(req, res, book)
    }
  }
  