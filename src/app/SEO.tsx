import type { ReactNode } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import siteMetadata from '@/siteMetadata';
import { GITHUB_LINK, TWITTER_LINK } from './links';

interface SEOProps {
  title?: string;
  description?: string;
  image?: {
    src: string;
    width?: number;
    height?: number;
  };
  children?: ReactNode;
}

function SEO({ title, description, image, children }: SEOProps) {
  const router = useRouter();
  const metaTitle = title
    ? `${title} | ${siteMetadata.title}`
    : siteMetadata.title;
  const metaDescription = description || siteMetadata.description;
  const metaImage = image || {
    src: `/api/og${
      title ? `?${new URLSearchParams({ title }).toString()}` : ''
    }`,
    width: 1200,
    height: 626,
  };
  const { origin } = siteMetadata;

  const metaImageAbsolutePath = `${origin}${metaImage.src}`;

  return (
    <Head>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:url" content={`${origin}${router.asPath}`} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImageAbsolutePath} />
      {metaImage.width ? (
        <meta property="og:image:width" content={String(metaImage.width)} />
      ) : null}
      {metaImage.height ? (
        <meta property="og:image:height" content={String(metaImage.height)} />
      ) : null}
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={siteMetadata.author} />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImageAbsolutePath} />
      <link href={GITHUB_LINK} rel="me" />
      <link href={TWITTER_LINK} rel="me" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      {children}
    </Head>
  );
}

export default SEO;
