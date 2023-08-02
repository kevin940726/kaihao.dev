import { notFound } from 'next/navigation';
import { H1 } from '@/components/Headers';
import EditOnGitHub from '@/components/EditOnGitHub';
import siteMetadata from '@/siteMetadata';
import type { Metadata } from 'next';

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { frontmatter, excerpt } = await import(`@/posts/${slug}/index.mdx`);

  return {
    title: frontmatter.title,
    description: excerpt,
    openGraph: {
      title: {
        default: siteMetadata.title,
        template: `%s | ${siteMetadata.title}`,
      },
      description: excerpt,
      url: `${siteMetadata.siteUrl}/posts/${slug}`,
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
}

export default async function Post({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const PostModule = await import(`@/posts/${slug}/index.mdx`);

  if (!PostModule) {
    return notFound();
  }

  const { frontmatter } = PostModule;

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

      <PostModule.default />

      <EditOnGitHub slug={slug} />
    </>
  );
}
