import {
  ExceptionFilter,
  Catch,
  HttpException,
  Logger,
  ArgumentsHost,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const reponse = context.getResponse<Response>();

    const status = exception.getStatus();
    this.logger.error(`${exception.message}, status: ${status}`);

    reponse.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      message: exception.message,
    });
  }
}
