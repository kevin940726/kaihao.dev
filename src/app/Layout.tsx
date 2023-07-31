import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { Open_Sans } from 'next/font/google';
import cx from 'classnames';
import Nav from './Nav';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
  isContent?: boolean;
}

const openSans = Open_Sans({
  display: 'swap',
  subsets: ['latin'],
  preload: true,
  variable: '--font-sans',
});

const Main = ({ className, ...props }: ComponentPropsWithoutRef<'main'>) => (
  <main
    className={cx('grow flex flex-col max-w-full w-[760px] mx-auto', className)}
    {...props}
  />
);

const Layout = ({ children, isContent, ...props }: LayoutProps) => (
  <div
    className={cx(
      [openSans.variable, 'font-sans'],
      'flex flex-col min-h-full bg-contentBackground',
      !isContent && 'md:bg-background',
      '[&>*]:shrink-0 [&>*]:min-h-0'
    )}
    {...props}
  >
    <Nav />
    {children}
    <Footer />
  </div>
);

Layout.Main = Main;

export default Layout;
