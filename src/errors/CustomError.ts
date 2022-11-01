import { errorCatalog, ErrorTypes } from './catalog';

class CustomError extends Error {
  status: number;
  constructor(errorType: ErrorTypes) {
    const error = errorCatalog[errorType];
    super(error.message);
    this.status = error.httpStatus;
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

export default CustomError;
