import RSS from 'rss';
import { getPosts } from '@/internals/posts';
import siteMetadata from '@/siteMetadata';

export const dynamic = 'force-dynamic';

export async function GET() {
  const feed = new RSS({
    title: siteMetadata.title,
    description: siteMetadata.description,
    feed_url: new URL('/rss.xml', siteMetadata.siteUrl).href,
    site_url: siteMetadata.siteUrl,
  });

  const posts = await getPosts();

  for (const post of posts) {
    const postUrl = new URL(`/posts/${post.slug}`, siteMetadata.origin).href;
    const html = await fetch(postUrl, {
      next: { tags: ['rss'] },
    }).then((response) => response.text());
    const image = html.match(
      /<meta property="og:image" content="([\s\S]+?)"\s?\/?>/,
    )?.[1];

    feed.item({
      title: post.frontmatter.title,
      description: post.excerpt,
      url: postUrl,
      guid: postUrl,
      date: post.frontmatter.date,
      enclosure: image ? { url: image, type: 'image/png' } : undefined,
    });
  }

  const xml = feed.xml({ indent: true });

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=UTF-8' },
  });
}
