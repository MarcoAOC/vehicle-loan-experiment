import { HttpException, HttpStatus } from '@nestjs/common';

export class InternalServerError extends HttpException {
  constructor(description: string | undefined) {
    super(
      `Internal server error - ${description}`,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
