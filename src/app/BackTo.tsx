import type { ComponentPropsWithoutRef } from 'react';
import FlatButton from './FlatButton';

type BackToProps = ComponentPropsWithoutRef<typeof FlatButton>;

const BackArrow = (props: ComponentPropsWithoutRef<'svg'>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    className="inline-flex h-4 w-4"
    {...props}
  >
    <path
      className="fill-current"
      d="M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z"
    />
  </svg>
);

const BackTo = ({ href, children, ...props }: BackToProps) => (
  <FlatButton href={href} className="text-base my-4" {...props}>
    <BackArrow />
    {children}
  </FlatButton>
);

export default BackTo;
