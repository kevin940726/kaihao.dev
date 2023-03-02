import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import sizeOf from 'image-size';
import { getHashDigest } from 'loader-utils';
import type { Plugin } from 'esbuild';

const BLUR_IMG_SIZE = 8;
const BLUR_QUALITY = 70;

const OUTPUT_DIRECTORY = path.join(process.cwd(), 'public/images');
const OUTPUT_PUBLIC_URL_PREFIX = '/images';

interface Image {
  src: string;
  width?: number;
  height?: number;
  blurDataURL?: string;
}

interface ImageLoader {
  imagesMap: Map<string, Image>;
  plugin: Plugin;
}

// @see https://github.com/vercel/next.js/blob/d2cbf8c4e0fd23dbe4edc495f9f8ddc9140a3304/packages/next/src/server/image-optimizer.ts#L410-L451
async function getImageSize(input: Buffer, extension: string) {
  if (extension === 'avif') {
    const transformer = sharp(input);
    const { width, height } = await transformer.metadata();
    return { width, height };
  }

  const { width, height } = sizeOf(input);
  return { width, height };
}

async function getBlurImage(buffer: Buffer, extension: string) {
  const transformer = sharp(buffer, { sequentialRead: true });
  transformer.rotate();
  transformer.resize(BLUR_IMG_SIZE, undefined, {
    withoutEnlargement: true,
  });
  if (extension === 'avif') {
    transformer.avif({
      quality: BLUR_QUALITY - 15,
      chromaSubsampling: '4:2:0',
    });
  } else if (extension === 'webp') {
    transformer.webp({ quality: BLUR_QUALITY });
  } else if (extension === 'png') {
    transformer.png({ quality: BLUR_QUALITY });
  } else if (extension === 'jpeg') {
    transformer.jpeg({ quality: BLUR_QUALITY });
  }
  const resizedImage = await transformer.toBuffer();
  return resizedImage;
}

const esbuildImageLoaderPlugin = (): ImageLoader => {
  const imagesMap = new Map<string, Image>();

  return {
    imagesMap,
    plugin: {
      name: 'image-loader',
      setup(build) {
        fs.mkdir(OUTPUT_DIRECTORY, { recursive: true });

        build.onResolve(
          { filter: /\.(png|jpe?g|gif|svg|webp|avif)$/ },
          (args) => {
            return {
              path: path.resolve(args.resolveDir, args.path),
              namespace: 'image-loader-ns',
            };
          }
        );

        build.onLoad(
          { filter: /.*/, namespace: 'image-loader-ns' },
          // Mostly copied from https://github.com/vercel/next.js/blob/canary/packages/next/build/webpack/loaders/next-image-loader.js
          async (args) => {
            const buffer = await fs.readFile(args.path);
            // @ts-ignore: The type of HashType is wrong
            const hash = getHashDigest(buffer, 'xxhash64', 'hex', 8);
            const rawExtension = path.extname(args.path);
            const basename = path.basename(args.path, rawExtension);
            const outputFilename = `${basename}.${hash}${rawExtension}`;
            const outputPath = path.join(OUTPUT_DIRECTORY, outputFilename);

            // Don't need to block outputting for copying
            fs.copyFile(args.path, outputPath).catch((err) => {
              throw err;
            });

            let extension = rawExtension.slice(1);
            if (extension === 'jpg') {
              extension = 'jpeg';
            }

            const { width, height } = await getImageSize(buffer, extension);

            const image: Image = {
              src: path.join(OUTPUT_PUBLIC_URL_PREFIX, outputFilename),
            };

            if (width && height) {
              image.width = width;
              image.height = height;

              const resizedImage = await getBlurImage(buffer, extension);

              image.blurDataURL = `data:image/${extension};base64,${resizedImage.toString(
                'base64'
              )}`;
            }

            imagesMap.set(args.path, image);

            return {
              contents: JSON.stringify(image),
              loader: 'json',
            };
          }
        );
      },
    },
  };
};

export default esbuildImageLoaderPlugin;
