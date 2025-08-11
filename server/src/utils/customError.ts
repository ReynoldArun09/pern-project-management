import { httpStatusCode } from "../enums/httpStatusCode";

export class CustomError extends Error {
  statusCode: httpStatusCode;
  constructor(message: string, statusCode: httpStatusCode) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
  }
}

export class NotFoundException extends CustomError {
  constructor(message = "Resource not found") {
    super(message, httpStatusCode.NOT_FOUND);
  }
}
