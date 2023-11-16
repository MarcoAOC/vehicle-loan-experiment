import calculateVehicleAprRequestToDto from './calculate-vehicle-apr.converter';
import { CalculateVehicleAprRequest } from '../dtos/calculate-vehicle-apr.dto';
import {
  NegativeValueIsNotAllowedException,
  ValueMustBeFloatException,
  ValueMustBeIntegerException,
} from 'src/common/exceptions/numbers.exception';

type TestTuple = [
  CalculateVehicleAprRequest,
  typeof ValueMustBeFloatException | typeof ValueMustBeIntegerException,
];

const numberCases: TestTuple[] = [
  [new CalculateVehicleAprRequest('asdd', '20', '500', '2010', '1000'), ValueMustBeFloatException],
  [
    new CalculateVehicleAprRequest('100.01', 'asd', '500', '2010', '1000'),
    ValueMustBeIntegerException,
  ],
  [
    new CalculateVehicleAprRequest('100.01', '20', '', '2010', '1000'),
    ValueMustBeIntegerException,
  ],
  [
    new CalculateVehicleAprRequest('100.01', '20', '500', 'asd', '1000'),
    ValueMustBeIntegerException,
  ],
  [
    new CalculateVehicleAprRequest('100.01', '20', '500', '2010', 'asd'),
    ValueMustBeIntegerException,
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
      (request, expectedError) => {
        expect(() => calculateVehicleAprRequestToDto(request)).toThrowError(
          expectedError,
        );
      },
    );
  });

  describe('every field must be a not negative number', () => {
    test.each(negativeNumberCases)('given %p request, must throw error', (request) => {
      expect(() => calculateVehicleAprRequestToDto(request)).toThrowError(
        NegativeValueIsNotAllowedException,
      );
    });
  });
});
