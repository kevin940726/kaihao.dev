import Image from 'next/image';
import type { ComponentProps } from 'react';

interface PostImageProps extends ComponentProps<typeof Image> {
  src: {
    src: string;
    height: number;
    width: number;
    blurDataURL?: string;
  };
}

export default function PostImage({
  src: { src, height, width, blurDataURL },
  alt,
  ...props
}: PostImageProps) {
  return (
    <span className="block mx-auto" style={{ maxWidth: `${width}px` }}>
      <a href={src} target="_blank" rel="noopener noreferrer nofollower">
        <Image
          alt={alt}
          title={alt}
          className="max-w-full h-auto"
          src={src}
          height={height}
          width={width}
          placeholder="blur"
          blurDataURL={blurDataURL}
          {...props}
        />
      </a>
    </span>
  );
}
