import cx from 'classnames';
import { Fira_Code } from 'next/font/google';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Main from '@/components/Main';
import type { ReactNode } from 'react';

const firaCode = Fira_Code({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  weight: ['300', '400', '500', '700'],
  variable: '--font-mono',
});

export default async function PostLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-full bg-contentBackground [&>*]:shrink-0 [&>*]:min-h-0">
      <Nav />

      <Main
        className={cx(
          firaCode.variable,
          'leading-[1.8] mt-8 mx-auto mb-16 px-[20px] md:px-0 break-words',
        )}
      >
        {children}
      </Main>

      <Footer />
    </div>
  );
}
