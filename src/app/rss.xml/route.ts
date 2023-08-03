import RSS from 'rss';
import { getPosts } from '@/internals/posts';
import siteMetadata from '@/siteMetadata';

export const revalidate = false; // Cache forever like a static file

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
    const html = await fetch(postUrl).then((res) => res.text());
    const contentHtml =
      html.match(/<main(?:[^>]*?)>([\s\S]+?)<\/main>/)?.[1] || '';
    const image =
      html.match(
        /<meta property="og:image" content="([\s\S]+?)"\s?\/?>/,
      )?.[1] || '';

    feed.item({
      title: post.frontmatter.title,
      description: post.excerpt,
      url: postUrl,
      guid: postUrl,
      date: post.frontmatter.date,
      enclosure: image ? { url: image } : undefined,
      custom_elements: contentHtml
        ? [{ 'content:encoded': `<![CDATA[${contentHtml}]` }]
        : undefined,
    });
  }

  const xml = feed.xml({ indent: true });

  return new Response(xml, { headers: { 'Content-Type': 'text/xml' } });
}
