import { notFound } from 'next/navigation';
import { H1 } from '@/components/Headers';
import EditOnGitHub from '@/components/EditOnGitHub';
import siteMetadata from '@/siteMetadata';
import { getPost } from '@/internals/posts';
import type { Post } from '@/internals/posts';
import type { Metadata } from 'next';

export async function generateMetadata(
  props: {
    params: Promise<{ slug: string }>;
  }
): Promise<Metadata> {
  const params = await props.params;

  const {
    slug
  } = params;

  try {
    const { frontmatter, excerpt } = await getPost(slug);

    return {
      title: frontmatter.title,
      description: excerpt,
      openGraph: {
        title: frontmatter.title,
        description: excerpt,
        url: `${siteMetadata.origin}/posts/${slug}`,
        siteName: siteMetadata.title,
        type: 'article',
        locale: 'en_US',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${frontmatter.title} | ${siteMetadata.title}`,
        description: excerpt,
        creator: siteMetadata.author,
      },
    };
  } catch {
    return notFound();
  }
}

export default async function Post(
  props: {
    params: Promise<{ slug: string }>;
  }
) {
  const params = await props.params;

  const {
    slug
  } = params;

  let post: Post;
  try {
    post = await getPost(slug);
  } catch {
    return notFound();
  }

  const { frontmatter, Component } = post;

  return (
    <>
      <H1>
        {frontmatter.title}
        <time
          dateTime={frontmatter.date}
          title={frontmatter.date}
          className="block text-xs font-normal text-[#aaaaaa] text-right mb-1"
        >
          {frontmatter.date}
        </time>
      </H1>

      <Component />

      <EditOnGitHub slug={slug} />
    </>
  );
}
