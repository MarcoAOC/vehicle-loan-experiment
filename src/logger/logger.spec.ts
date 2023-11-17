import { CustomLogger } from './logger';
import { ConsoleLogger } from '@nestjs/common';

describe('CustomLogger', () => {
  let customLogger: CustomLogger;

  beforeEach(() => {
    customLogger = new CustomLogger();
  });

  it('should extend ConsoleLogger', () => {
    expect(customLogger).toBeInstanceOf(ConsoleLogger);
  });

  it('should call super.error method with provided arguments', () => {
    const errorSpy = jest.spyOn(ConsoleLogger.prototype, 'error');
    const message = 'Error message';

    customLogger.error(message);

    expect(errorSpy).toHaveBeenCalledWith(message);
  });

  it('should call super.log method with provided arguments', () => {
    const logSpy = jest.spyOn(ConsoleLogger.prototype, 'log');
    const message = 'Log message';

    customLogger.log(message);

    expect(logSpy).toHaveBeenCalledWith(message);
  });

  it('should call super.debug method with provided arguments', () => {
    const debugSpy = jest.spyOn(ConsoleLogger.prototype, 'debug');
    const message = 'Debug message';

    customLogger.debug(message);

    expect(debugSpy).toHaveBeenCalledWith(message);
  });

  it('should call super.warn method with provided arguments', () => {
    const warnSpy = jest.spyOn(ConsoleLogger.prototype, 'warn');
    const message = 'Warning message';

    customLogger.warn(message);

    expect(warnSpy).toHaveBeenCalledWith(message);
  });
});
