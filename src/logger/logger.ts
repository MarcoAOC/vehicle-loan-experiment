import { ConsoleLogger } from '@nestjs/common';

export class CustomLogger extends ConsoleLogger {
  error(message: string) {
    super.error(message);
  }
  log(message: string) {
    super.log(message);
  }

  debug(message: string) {
    super.debug(message);
  }

  warn(message: string) {
    super.warn(message);
  }
}
