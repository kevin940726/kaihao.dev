import type { ComponentPropsWithoutRef } from 'react';
import cx from 'classnames';

const Main = ({ className, ...props }: ComponentPropsWithoutRef<'main'>) => (
  <main
    className={cx('grow flex flex-col max-w-full w-[760px] mx-auto', className)}
    {...props}
  />
);

export default Main;
