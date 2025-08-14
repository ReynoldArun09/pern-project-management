import { httpStatusCode } from '../enums/httpStatusCode';

export class CustomError extends Error {
  statusCode: httpStatusCode;
  constructor(message: string, statusCode: httpStatusCode) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
  }
}

export class NotFoundException extends CustomError {
  constructor(message = 'Resource not found') {
    super(message, httpStatusCode.NOT_FOUND);
  }
}

export class InternalServerException extends CustomError {
  constructor(message = 'Internal Server Error') {
    super(message, httpStatusCode.INTERNAL_SERVER);
  }
}
export class UnAuthorizedException extends CustomError {
  constructor(message = 'Unauthorized') {
    super(message, httpStatusCode.UNAUTHORIZED);
  }
}

export class BadRequestException extends CustomError {
  constructor(message = 'Bad Request') {
    super(message, httpStatusCode.BAD_REQUEST);
  }
}
