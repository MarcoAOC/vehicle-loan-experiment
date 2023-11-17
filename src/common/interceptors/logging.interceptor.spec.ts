import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext, CallHandler } from '@nestjs/common';
import { LoggingInterceptor } from './logging.interceptor';

describe('LoggingInterceptor', () => {
  let loggingInterceptor: LoggingInterceptor;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [],
      providers: [LoggingInterceptor],
    }).compile();
    loggingInterceptor = module.get<LoggingInterceptor>(LoggingInterceptor);
  });

  it('should log the request information', async () => {
    const loggerSpy = jest.spyOn(loggingInterceptor.logger, 'log');

    const mockExecutionContext = {
      switchToHttp: jest.fn(() => ({
        getRequest: jest.fn(() => ({
          method: 'GET',
          url: '/test',
        })),
      })),
    } as unknown as ExecutionContext;

    const mockCallHandler = {
      handle: jest.fn(),
    } as CallHandler;

    loggingInterceptor.intercept(mockExecutionContext, mockCallHandler);

    expect(loggerSpy).toHaveBeenCalledWith('GET - /test');
  });
});
