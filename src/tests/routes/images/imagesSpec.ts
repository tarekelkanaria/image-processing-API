import images from '../../../routes/images/images';
import ImageCookies from '../../../utilities/cookies';
import { promises as fsPromises } from 'fs';
import resizeImage from '../../../utilities/resize';
// Test the functionality of the app
describe('Test convert and resize functionality', () => {
  it('Check for cookies and if exist should end', () => {
    images.get('/', (req, res): void => {
      if (req.cookies) {
        const cookieFile = req.cookies as ImageCookies;
        if (
          (cookieFile.filename as unknown as string) === 'fjord' &&
          (cookieFile.height as unknown as string) === '200' &&
          (cookieFile.width as unknown as string) === '200'
        ) {
          expect(res.sendFile(cookieFile.file));
        }
      }
      // expect to end the response once the file has been sent.
      expect(res.end());
    });
  });
  it('Find the requested Image', () => {
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
