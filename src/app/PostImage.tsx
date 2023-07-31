import type { ComponentProps } from 'react';
import Image from 'next/image';

interface PostImageProps extends ComponentProps<typeof Image> {
  src: {
    src: string;
    height: number;
    width: number;
    blurDataURL?: string;
  };
}

export default function PostImage({ src, alt, ...props }: PostImageProps) {
  return (
    <span className="block mx-auto" style={{ maxWidth: `${src.width}px` }}>
      <a href={src.src} target="_blank" rel="noopener noreferrer nofollower">
        <Image
          alt={alt}
          title={alt}
          placeholder="blur"
          className="max-w-full h-auto"
          {...src}
          {...props}
        />
      </a>
    </span>
  );
}
