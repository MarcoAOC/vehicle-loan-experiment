import { HttpException, HttpStatus } from '@nestjs/common';

export class InternalServerErrorException extends HttpException {
  constructor(description: string | undefined = undefined) {
    super(`Internal server error - ${description ??''}`, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
