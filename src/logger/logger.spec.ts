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
    const stack = 'Error stack';
    const context = 'Error context';

    customLogger.error(message, stack, context);

    expect(errorSpy).toHaveBeenCalledWith(message, stack, context);
  });

  it('should call super.log method with provided arguments', () => {
    const logSpy = jest.spyOn(ConsoleLogger.prototype, 'log');
    const message = 'Log message';
    const stack = 'Log stack';
    const context = 'Log context';

    customLogger.log(message, stack, context);

    expect(logSpy).toHaveBeenCalledWith(message, stack, context);
  });

  it('should call super.debug method with provided arguments', () => {
    const debugSpy = jest.spyOn(ConsoleLogger.prototype, 'debug');
    const message = 'Debug message';
    const stack = 'Debug stack';
    const context = 'Debug context';

    customLogger.debug(message, stack, context);

    expect(debugSpy).toHaveBeenCalledWith(message, stack, context);
  });

  it('should call super.warn method with provided arguments', () => {
    const warnSpy = jest.spyOn(ConsoleLogger.prototype, 'warn');
    const message = 'Warning message';
    const stack = 'Warning stack';
    const context = 'Warning context';

    customLogger.warn(message, stack, context);

    expect(warnSpy).toHaveBeenCalledWith(message, stack, context);
  });
});