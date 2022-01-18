import {
    controller,
    httpPost,
    requestBody,
    request,
    response
  } from "inversify-express-utils";
  import { Request, Response } from "express";
  import { User, UserDTO } from "@app/data/user";
  import { BaseController } from "@app/data/util";
  import { validate } from "@app/data/util"
  import { isUser } from "./user.validator";
  import { UserSer } from "@app/services/user";
  
  type ControllerResponse = User | User[] | string;
  
  @controller("/user")
  export class UserTaskController extends BaseController<ControllerResponse> {
    @httpPost("/", validate(isUser))
    async createUser(
      @request() req: Request,
      @response() res: Response,
      @requestBody() body: UserDTO
    ) {
      const user = await UserSer.createUser(body);
      this.handleSuccess(req, res, user);
    }
  
    @httpPost("/login", validate(isUser))
    async login(
      @request() req: Request,
      @response() res: Response,
      @requestBody() body: UserDTO
    ){
      const claim = await UserSer.loginUser(body.email_address, body.password, req);
      this.handleSuccess(req, res, claim)
    }
  }
  