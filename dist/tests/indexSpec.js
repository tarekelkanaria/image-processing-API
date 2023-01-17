'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const index_1 = __importDefault(require('../index'));
const supertest_1 = __importDefault(require('supertest'));
const request = (0, supertest_1.default)(index_1.default);
// Test endpoints on images route
describe('Test endpoint responses', () => {
  it('gets the api endpoint', () =>
    __awaiter(void 0, void 0, void 0, function* () {
      const response = yield request
        .get('/images')
        // gets the params of the url in testing
        .query({ filename: 'fjord', width: 200, height: 200 });
      expect(response.status).toBe(200);
    }));
  it('should catch error in response', () =>
    __awaiter(void 0, void 0, void 0, function* () {
      const errResponse = yield request
        .get('/images')
        .query({ filename: 'ord', width: 200, height: 200 });
      // expect to fail
      expect(errResponse.status).toBe(500);
    }));
});
