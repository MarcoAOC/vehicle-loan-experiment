import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidParametersException extends HttpException {
  constructor(description: string | undefined) {
    super(`Invalid parameter type - ${description}`, HttpStatus.BAD_REQUEST);
  }
}
