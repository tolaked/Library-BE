import { Query, Audits, ActionLog, ControllerError, DuplicateModelError, InvalidSessionError, ModelNotFoundError } from "@app/data/util";
import { Request, Response } from "express";
import { injectable, unmanaged } from "inversify";
import pick from "lodash/pick";
import Logger = require("bunyan");
import { Log } from "../../common/services/log";
import { StatusCodes } from "http-status-codes";
import { responseHandler } from "./response";
import { ForbiddenError, UnAuthorisedError } from "./error";

@injectable()
export class Controller<T> {
  constructor(@unmanaged() private logger: Logger) {}

  /**
   * Handles operation success and sends a HTTP response.
   * __Note__: if the data passed is a promise, no value is sent
   * until the promise resolves.
   * @param req Express request
   * @param res Express response
   * @param result Success data
   */
  async handleSuccess(req: Request, res: Response, result: T | string) {
    res.json({
      status: "success",
      data: result
    });
    this.logger.info({ req, res });
  }

  /*
   * Determines the HTTP status code of an error
   * @param err Error object
   */
  getHTTPErrorCode(err) {
    // check if error code exists and is a valid HTTP code.
    if (err.code >= 100 && err.code < 600) {
      if (err instanceof ModelNotFoundError) return StatusCodes.NOT_FOUND;
      if (err instanceof DuplicateModelError) return StatusCodes.CONFLICT;
      if (err instanceof InvalidSessionError) return StatusCodes.UNAUTHORIZED;
      if (err instanceof UnAuthorisedError) return StatusCodes.UNAUTHORIZED;
      if (err instanceof ForbiddenError) return StatusCodes.FORBIDDEN;
      return err.code;
    }
    return StatusCodes.BAD_REQUEST;
  }

  /**
   * Handles operation error, sends a HTTP response and logs the error.
   * @param req Express request
   * @param res Express response
   * @param error Error object
   * @param message Optional error message. Useful for hiding internal errors from clients.
   */
  handleError(req: Request, res: Response, err: Error, message?: string) {
    /**
     * Useful when we call an asynchrous function that might throw
     * after we've sent a response to client
     */
    if (res.headersSent) return Log.error(err);

    const { code } = <ControllerError>err;

    const errorMessage = message || err.message;

    responseHandler(res, this.getHTTPErrorCode(err) ?? code, errorMessage, null)
    Log.error(req, res, err);
  }


  /**
   * Picks relevant pagination options from an Express query object
   * @param query Express Query object
   */
  getPaginationOptions(query: any): PaginationOptions {
    return pick(query, ["page", "per_page", "projections", "sort"]);
  }
}

export type PaginationOptions = Pick<Query, Exclude<keyof Query, "conditions" | "archived">>;

export class BaseController<T> extends Controller<T> {
  constructor() {
    super(Log);
  }

  log(req: Request, action: ActionLog) {
    return Audits.log(req, action);
  }
}