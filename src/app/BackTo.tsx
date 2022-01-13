import type { ComponentProps, ComponentPropsWithRef } from 'react';
import { css } from '@emotion/react';
import Link from 'next/link';
import FlatButton from './FlatButton';

type BackToProps = ComponentPropsWithRef<'a'> & {
  href: ComponentProps<typeof Link>['href'];
};

const BackArrow = (props: ComponentPropsWithRef<'svg'>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z" />
  </svg>
);

const BackTo = ({ href, children, ...props }: BackToProps) => (
  <Link href={href} passHref>
    <FlatButton
      css={css`
        font-size: 1rem;
        margin: 1em 0;
      `}
      {...props}
    >
      <BackArrow
        css={css`
          &,
          svg {
            display: inline-flex;
            height: 1rem;
            width: 1rem;

            path {
              fill: currentColor;
            }
          }
        `}
      />
      {children}
    </FlatButton>
  </Link>
);

export default BackTo;
