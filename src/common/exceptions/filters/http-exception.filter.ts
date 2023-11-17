import { ExceptionFilter, Catch, HttpException, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { CustomLogger } from 'src/logger/logger';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  readonly logger = new CustomLogger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    const status = exception.getStatus();
    this.logger.error(`${exception.message}, status: ${status}`);

    const newResponse = response.status(status);
    newResponse.json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      message: exception.message,
    });
  }
}
