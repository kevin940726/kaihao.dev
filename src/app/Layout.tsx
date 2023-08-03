import cx from 'classnames';
import { Open_Sans } from 'next/font/google';
import { themeModeScript } from '@/components/themeMode';
import { GITHUB_LINK, TWITTER_LINK } from '@/components/links';
import siteMetadata from '@/siteMetadata';
import '@/components/globals.css';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';

const openSans = Open_Sans({
  display: 'swap',
  subsets: ['latin'],
  preload: true,
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  openGraph: {
    title: {
      default: siteMetadata.title,
      template: `%s | ${siteMetadata.title}`,
    },
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.title,
    type: 'website',
    locale: 'en_US',
  },
  authors: [{ name: siteMetadata.author }],
  metadataBase: new URL(siteMetadata.origin),
  alternates: {
    types: {
      'application/rss+xml': '/rss.xml',
    },
  },
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className="h-full tab">
      <head>
        <link href={GITHUB_LINK} rel="me" />
        <link href={TWITTER_LINK} rel="me" />
      </head>
      <body
        className={cx('h-full text-contentText bg-contentBackground', [
          openSans.variable,
          'font-sans',
        ])}
        suppressHydrationWarning
      >
        <script
          dangerouslySetInnerHTML={{
            __html: `(${themeModeScript.toString()})()`,
          }}
        />

        {children}
      </body>
    </html>
  );
}
