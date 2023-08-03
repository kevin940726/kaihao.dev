import Image from 'next/image';
import githubIcon from './github-icon.png';
import PostLink from './PostLink';
import siteMetadata from '@/siteMetadata';

const getEditURL = (slug: string) =>
  `${siteMetadata.repo}/edit/main/src/posts/${slug}/index.mdx`;

const EditOnGitHub = ({ slug }: { slug: string }) => {
  return (
    <PostLink
      href={getEditURL(slug)}
      className="inline-flex items-center self-end text-sm leading-6 text-black dark:text-backgroundWhite border-current pr-1"
    >
      <span className="inline-flex mr-2">
        <Image
          src={githubIcon}
          height={21}
          width={21}
          alt=""
          className="rounded-full"
        />
      </span>
      Edit on GitHub
    </PostLink>
  );
};

export default EditOnGitHub;
