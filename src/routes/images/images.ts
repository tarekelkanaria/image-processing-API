import express from 'express';
import { promises as fsPromises } from 'fs';
import path from 'path';
import resizeImage from '../../utilities/resize';
import cookieParser from 'cookie-parser';
import ImageCookies from '../../utilities/cookies';

// Define the images route using express
const images = express.Router();
// Define the src path for images
const imagesPath = './assets/images';
// to check the cookies if it's exist
images.use(cookieParser());
// Main method for images route using get
images.get('/', (req, res): void => {
  try {
    // destructuring url params using request object
    const { filename, width, height } = req.query;
    const imageName = filename as unknown as string;
    const imageWidth: number = parseInt(width as string);
    const imageHeight: number = parseInt(height as string);
    // check if cookies exist
    if (req.cookies) {
      // Proper typing for coockies using ImageCookies interface
      const cookieFile = req.cookies as ImageCookies;
      //  Compare url params with cookies
      if (
        (cookieFile.filename as unknown as string) === req.query.filename &&
        (cookieFile.height as unknown as string) === req.query.height &&
        (cookieFile.width as unknown as string) === req.query.width
      ) {
        // if it's the same send the file in cookies and stop.
        res.sendFile(cookieFile.file);
        return;
        // if it's not clear cookies to not take much space in memory
      } else {
        res.clearCookie(req.query.filename as string);
        res.clearCookie(req.query.width as string);
        res.clearCookie(req.query.height as string);
        res.clearCookie(cookieFile.file);
      }
    }
    // Function to convert the requested image from src folder to destination folder with requested height and weight
    const convert = async (
      filename: string,
      imageWidth: number,
      imageHeight: number
    ): Promise<void> => {
      // to read all files in the src folder and loop over them and compare them with the requested param
      await fsPromises
        .readdir(imagesPath)
        .then((imagesArray: string[]): string[] => {
          return imagesArray.filter((fileName) => {
            return fileName === `${filename}.jpg`;
          });
        })
        // to specify the requested image path and send it to resizeImage module to apply 'sharp' functionality
        .then(async (allImages: string[]) => {
          const requestedImagePath = path.join(
            __dirname,
            `../../../thumb/${allImages[0]}`
          );
          return await resizeImage(
            `${imagesPath}/${allImages[0]}`,
            imageWidth,
            imageHeight,
            requestedImagePath
          );
        })
        // Take the returned image path from resize image module and send it by response object
        .then((returnedPath): void => {
          res.sendFile(returnedPath as unknown as string);
          res.cookie('filename', filename);
          res.cookie('width', imageWidth);
          res.cookie('height', imageHeight);
          res.cookie('file', returnedPath);
        })
        // Handle any error throughout the process
        .catch((err) => {
          res
            .status(500)
            .send(`You have the following Error: ${err as string}`);
        });
    };
    void convert(imageName, imageWidth, imageHeight);
  } catch (err) {
    res.status(500).send(`You have the following Error: ${err as string}`);
  }
});

export default images;
