import fs from 'fs/promises';
import path from 'path';
import { optimizeImage, getImageSize } from 'next/dist/server/image-optimizer';
import { getHashDigest } from 'loader-utils';
import type { Plugin } from 'esbuild';

const BLUR_IMG_SIZE = 8;
const BLUR_QUALITY = 70;
const VALID_BLUR_EXT = ['jpeg', 'png', 'webp', 'avif'] as const;

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

            const { width, height } = await getImageSize(
              buffer,
              extension as typeof VALID_BLUR_EXT[number]
            );

            const image: Image = {
              src: path.join(OUTPUT_PUBLIC_URL_PREFIX, outputFilename),
            };

            if (width && height) {
              image.width = width;
              image.height = height;

              // Shrink the image's largest dimension
              // const dimension = width >= height ? 'width' : 'height';

              const resizedImage = await optimizeImage({
                buffer,
                contentType: extension,
                width: BLUR_IMG_SIZE,
                quality: BLUR_QUALITY,
              });

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
