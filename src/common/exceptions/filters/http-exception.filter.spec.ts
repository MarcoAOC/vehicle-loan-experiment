import { ArgumentsHost } from "@nestjs/common";
import { InternalServerErrorException } from "../internal-server-error.exception";
import { InvalidParametersException } from "../invalid-parameters.exception";
import { HttpExceptionFilter } from "./http-exception.filter";

describe('HttpExceptionFilter', () => {

  const filter = new HttpExceptionFilter();
  

  type TestParams = [InternalServerErrorException | InvalidParametersException, number, string]

const testParams: TestParams[] = [
  [new InternalServerErrorException(), 500, 'Internal server error - '],
  [new InvalidParametersException(), 400, 'Invalid parameter type - '],
];

test.each(testParams)('given error %p, should return status code %p and error description %p', (exception, statusCode, message) => {
  const mockStatus = jest.fn().mockReturnValue({ json: jest.fn() });
  const mockGetResponse = jest.fn().mockReturnValue({ status: mockStatus });
  const host: ArgumentsHost = {
    switchToHttp: jest.fn(() => ({
      getResponse: mockGetResponse,
    })),
  } as unknown as ArgumentsHost;

    
    const loggerSpy = jest.spyOn(filter.logger, 'error').mockImplementation(() => {});
    const responseStatusSpy = jest.spyOn(exception, 'getStatus').mockReturnValue(statusCode);

    filter.catch(exception, host);

    expect(loggerSpy).toHaveBeenCalledWith(`${message}, status: ${statusCode}`);
    expect(responseStatusSpy).toHaveBeenCalled();
    expect(mockGetResponse().status).toHaveBeenCalledWith(statusCode);
    expect(mockStatus().json).toHaveBeenCalledWith({
      statusCode,
      timestamp: expect.any(String),
      message,
    });

    loggerSpy.mockRestore();
    responseStatusSpy.mockRestore();
});

});