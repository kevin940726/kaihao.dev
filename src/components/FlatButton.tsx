import { forwardRef } from 'react';
import Link from 'next/link';
import cx from 'classnames';
import type { ComponentPropsWithoutRef } from 'react';

const FlatButton = forwardRef<
  HTMLAnchorElement,
  ComponentPropsWithoutRef<typeof Link>
>((props, ref) => (
  <Link
    {...props}
    className={cx(
      'inline-flex items-center no-underline transition-colors hover:bg-background',
      props.className,
    )}
    ref={ref}
  />
));
FlatButton.displayName = 'FlatButton';

export default FlatButton;
