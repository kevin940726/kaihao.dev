import type { ComponentProps } from 'react';
import Image from 'next/image';
import { css } from '@emotion/react';

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
    <span
      css={css`
        display: block;
        margin: 0 auto;
      `}
      style={{ maxWidth: `${src.width}px` }}
    >
      <a href={src.src} target="_blank" rel="noopener noreferrer nofollower">
        <Image {...src} alt={alt} title={alt} placeholder="blur" {...props} />
      </a>
    </span>
  );
}
