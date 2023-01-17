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
const images_1 = __importDefault(require('../../../routes/images/images'));
const fs_1 = require('fs');
const resize_1 = __importDefault(require('../../../utilities/resize'));
// Test the functionality of the app
describe('Test convert and resize functionality', () => {
  it('Check for cookies and if exist should end', () => {
    images_1.default.get('/', (req, res) => {
      if (req.cookies) {
        const cookieFile = req.cookies;
        if (
          cookieFile.filename === 'fjord' &&
          cookieFile.height === '200' &&
          cookieFile.width === '200'
        ) {
          expect(res.sendFile(cookieFile.file));
        }
      }
      // expect to end the response once the file has been sent.
      expect(res.end());
    });
  });
  it('Find the requested Image', () => {
    images_1.default.get('/', () => {
      () =>
        __awaiter(void 0, void 0, void 0, function* () {
          // Test Promises in async/await as specified in jasmine's documentation
          yield expectAsync(yield fs_1.promises.readdir('./assets/images'))
            .toBeResolved()
            .then(() =>
              __awaiter(void 0, void 0, void 0, function* () {
                yield expectAsync(resize_1.default).toBeResolved();
              })
            );
        });
    });
  });
});
