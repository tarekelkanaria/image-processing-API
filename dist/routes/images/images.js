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
const express_1 = __importDefault(require('express'));
const fs_1 = require('fs');
const path_1 = __importDefault(require('path'));
const resize_1 = __importDefault(require('../../utilities/resize'));
const cookie_parser_1 = __importDefault(require('cookie-parser'));
// Define the images route using express
const images = express_1.default.Router();
// Define the src path for images
const imagesPath = './assets/images';
// to check the cookies if it's exist
images.use((0, cookie_parser_1.default)());
// Main method for images route using get
images.get('/', (req, res) => {
  // destructuring url params using request object
  const { filename, width, height } = req.query;
  const imageName = filename;
  const imageWidth = parseInt(width);
  const imageHeight = parseInt(height);
  // check if cookies exist
  if (req.cookies) {
    // Proper typing for coockies using ImageCookies interface
    const cookieFile = req.cookies;
    //  Compare url params with cookies
    if (
      cookieFile.filename === req.query.filename &&
      cookieFile.height === req.query.height &&
      cookieFile.width === req.query.width
    ) {
      // if it's the same send the file in cookies and stop.
      res.sendFile(cookieFile.file);
      return;
      // if it's not clear cookies to not take much space in memory
    } else {
      res.clearCookie(req.query.filename);
      res.clearCookie(req.query.width);
      res.clearCookie(req.query.height);
      res.clearCookie(cookieFile.file);
    }
  }
  // Function to convert the requested image from src folder to destination folder with requested height and weight
  const convert = (filename, imageWidth, imageHeight) =>
    __awaiter(void 0, void 0, void 0, function* () {
      // to read all files in the src folder and loop over them and compare them with the requested param
      yield fs_1.promises
        .readdir(imagesPath)
        .then((imagesArray) => {
          return imagesArray.filter((fileName) => {
            return fileName === `${filename}.jpg`;
          });
        })
        // to specify the requested image path and send it to resizeImage module to apply 'sharp' functionality
        .then((allImages) =>
          __awaiter(void 0, void 0, void 0, function* () {
            const requestedImagePath = path_1.default.join(
              __dirname,
              `../../../thumb/${allImages[0]}`
            );
            return yield (0,
            resize_1.default)(`${imagesPath}/${allImages[0]}`, imageWidth, imageHeight, requestedImagePath);
          })
        )
        // Take the returned image path from resize image module and send it by response object
        .then((returnedPath) => {
          res.sendFile(returnedPath);
          res.cookie('filename', filename);
          res.cookie('width', imageWidth);
          res.cookie('height', imageHeight);
          res.cookie('file', returnedPath);
        })
        // Handle any error throughout the process
        .catch((err) => {
          res.status(500).send(`You have the following Error: ${err}`);
        });
    });
  void convert(imageName, imageWidth, imageHeight);
});
exports.default = images;
