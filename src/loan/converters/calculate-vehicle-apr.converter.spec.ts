import calculateVehicleAprRequestToDto from './calculate-vehicle-apr.converter';
import { CalculateVehicleAprRequest } from '../dtos/calculate-vehicle-apr.dto';
import {
  NegativeValueIsNotAllowed,
  ValueMustBeFloat,
  ValueMustBeInteger,
} from 'src/common/exceptions/numbers.exception';

type TestTuple = [
  CalculateVehicleAprRequest,
  typeof ValueMustBeFloat | typeof ValueMustBeInteger,
];

const numberCases: TestTuple[] = [
  [new CalculateVehicleAprRequest('asdd', '20', '500', '2010', '1000'), ValueMustBeFloat],
  [
    new CalculateVehicleAprRequest('100.01', 'asd', '500', '2010', '1000'),
    ValueMustBeInteger,
  ],
  [
    new CalculateVehicleAprRequest('100.01', '20', 'asd', '2010', '1000'),
    ValueMustBeInteger,
  ],
  [
    new CalculateVehicleAprRequest('100.01', '20', '500', 'asd', '1000'),
    ValueMustBeInteger,
  ],
  [
    new CalculateVehicleAprRequest('100.01', '20', '500', '2010', 'asd'),
    ValueMustBeInteger,
  ],
];
const negativeNumberCases = [
  [new CalculateVehicleAprRequest('-6000', '20', '500', '2015', '1000')],
  [new CalculateVehicleAprRequest('6000', '-20', '500', '2015', '1000')],
  [new CalculateVehicleAprRequest('6000', '20', '-500', '2015', '1000')],
  [new CalculateVehicleAprRequest('6000', '20', '500', '-2015', '1000')],
  [new CalculateVehicleAprRequest('6000', '20', '500', '2015', '-1000')],
];

describe('calculate-vehicle-apr-converter', () => {
  describe('every field must be a string number', () => {
    test.each<TestTuple>(numberCases)(
      'given %p request, must throw error %p',
      (firstArg, expectedResult) => {
        expect(() => calculateVehicleAprRequestToDto(firstArg)).toThrowError(
          expectedResult,
        );
      },
    );
  });

  describe('every field must be a not negative number', () => {
    test.each(negativeNumberCases)('given %p request, must throw error', (request) => {
      expect(() => calculateVehicleAprRequestToDto(request)).toThrowError(
        NegativeValueIsNotAllowed,
      );
    });
  });
});