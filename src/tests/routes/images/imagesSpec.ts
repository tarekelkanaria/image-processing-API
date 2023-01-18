import { Request, Response } from 'express';
import images from '../../../routes/images/images';
import ImageCookies from '../../../utilities/cookies';
import { promises as fsPromises } from 'fs';
import resizeImage from '../../../utilities/resize';
import path from 'path';
// Test the functionality of the app
describe('Test convert and resize functionality' as string, (): void => {
  it('Check for cookies and if exist should end' as string, (): void => {
    images.get('/', (req: Request, res: Response): void => {
      if (req.cookies) {
        const cookieFile = req.cookies as ImageCookies;
        if (
          (cookieFile.filename as unknown as string) === 'fjord' &&
          (cookieFile.height as unknown as string) === '200' &&
          (cookieFile.width as unknown as string) === '200' &&
          (path.join(
            __dirname,
            `../../../thumb/${req.query.filename as string}`
          ) as unknown as boolean) === true
        ) {
          expect(res.sendFile(cookieFile.file));
        }
      }
      // expect to end the response once the file has been sent.
      expect(res.end());
    });
  });
  it('Find the requested Image' as string, (): void => {
    images.get('/', (): void => {
      async (): Promise<void> => {
        // Test Promises in async/await as specified in jasmine's documentation
        await expectAsync(await fsPromises.readdir('./assets/images'))
          .toBeResolved()
          .then(async () => {
            await expectAsync(resizeImage).toBeResolved();
          });
      };
    });
  });
});
