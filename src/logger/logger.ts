import { ConsoleLogger } from '@nestjs/common';

export class CustomLogger extends ConsoleLogger {

  error(message: any, stack?: string, context?: string) {
    super.error(message, stack, context);
  }
  log(message: any, stack?: string, context?: string) {
    super.log(message, stack, context);
  }

  debug(message: any, stack?: string, context?: string) {
    super.debug(message, stack, context);
  }

  warn(message: any, stack?: string, context?: string) {
    super.warn(message, stack, context);
  }
}