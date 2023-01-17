import sharp, { OutputInfo } from 'sharp';
// async function to resize the image using sharp
// it takes the src path, width, height, and destination path.
// return a promise of type "OutputInfo" as specified in sharp types.
const resizeImage = async (
  srcPath: string,
  width: number,
  height: number,
  destPath: string
): Promise<OutputInfo> => {
  await sharp(srcPath)
    .resize(width, height, {
      fit: 'cover'
    })
    .toFile(destPath);
  return destPath as unknown as OutputInfo;
};
export default resizeImage;
