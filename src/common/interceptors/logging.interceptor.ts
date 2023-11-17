import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { CustomLogger } from 'src/logger/logger';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  readonly logger = new CustomLogger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest() as Request;

    this.logger.log(`${request.method} - ${request.url}`);
    return next.handle();
  }
}
