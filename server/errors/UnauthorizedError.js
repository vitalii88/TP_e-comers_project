import { StatusCodes } from 'http-status-codes';
import { CustomApiError } from './index.js';

class UnauthorizedError extends CustomApiError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}

export default UnauthorizedError;
