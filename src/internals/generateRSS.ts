import fs from 'fs/promises';
import path from 'path';
import RSS from 'rss';
import { getMDXComponent } from 'mdx-bundler/client';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { getPosts } from './posts';
import siteMetadata from '../siteMetadata';

const OUTPUT_FILE_PATH = path.join(process.cwd(), 'public/rss.xml');

(async function generateRSS() {
  const feed = new RSS({
    title: siteMetadata.title,
    description: siteMetadata.description,
    feed_url: new URL('/rss.xml', siteMetadata.siteUrl).href,
    site_url: siteMetadata.siteUrl,
  });

  const posts = await getPosts();

  for (const post of posts) {
    const MDXComponent = getMDXComponent(post.code);
    const html = renderToStaticMarkup(createElement(MDXComponent));

    const postUrl = new URL(`/posts/${post.slug}`, siteMetadata.siteUrl).href;

    feed.item({
      title: post.frontmatter.title,
      description: post.excerpt,
      url: postUrl,
      guid: postUrl,
      date: post.frontmatter.date,
      enclosure: post.image
        ? {
            url: new URL(post.image.src, siteMetadata.siteUrl).href,
          }
        : undefined,
      custom_elements: [{ 'content:encoded': `<![CDATA[${html}]` }],
    });
  }

  const xml = feed.xml({ indent: true });

  fs.writeFile(OUTPUT_FILE_PATH, xml, 'utf-8');
})();
